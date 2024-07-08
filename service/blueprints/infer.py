from flask import Blueprint, request, jsonify
from resources.resources import hf_tokenizer, hf_model
from torch import ones_like

# Sampling Parameters
max_new_tokens=150
temperature=0.8
repetition_penalty=1.1

# View Function
infer_bp = Blueprint('infer', __name__)

@infer_bp.route("/api/infer", methods=["POST"])
def infer():
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "No input provided"}), 400

    try:
        input_ids = hf_tokenizer(prompt, return_tensors="pt").input_ids.to("cuda")
        attn_mask = ones_like(input_ids)

        generated_ids = hf_model.generate(
            input_ids, 
            attention_mask=attn_mask,
            max_new_tokens=max_new_tokens,
            temperature=temperature, 
            repetition_penalty=repetition_penalty, 
            do_sample=True, 
            eos_token_id=hf_tokenizer.eos_token_id
        )

        inferred = hf_tokenizer.decode(
            generated_ids[0][input_ids.shape[-1]:], 
            skip_special_tokens=True, 
            clean_up_tokenization_space=True
        )

        return jsonify({"inferred": inferred}), 200
    
    except Exception as e:
        print(f"infer prompt: {prompt}")  # debug
        jsonify({"error": e}), 500