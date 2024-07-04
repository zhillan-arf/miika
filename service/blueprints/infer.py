from flask import Blueprint, request, jsonify
from resources.resources import hf_model, hf_tokenizer
from torch import ones_like

infer_bp = Blueprint('infer', __name__)

@infer_bp.route("/api/infer", methods=["POST"])
def infer():
    temperature = 0.8
    max_new_tokens = 150
    repetition_penalty = 1.0
    do_sample = True

    data = request.get_json()

    if 'prompt' not in data:
        return jsonify({"error": "No input provided"}), 400
    
    prompt = data['prompt']

    # inferred = model.generate(
    #     prompt,
    #     temperature=temperature,
    #     max_new_tokens=max_new_tokens,
    #     repetition_penalty=repetition_penalty,
    #     do_sample=do_sample
    # )

    # input_ids = hf_tokenizer(prompt, return_tensors="pt").input_ids.to("cuda")
    # attn_mask = ones_like(input_ids)

    # generated_ids = hf_model.generate(
    #     input_ids, 
    #     attention_mask=attn_mask,
    #     max_new_tokens=150,
    #     temperature=0.8, 
    #     repetition_penalty=1, 
    #     do_sample=True, 
    #     eos_token_id=hf_tokenizer.eos_token_id
    # )

    # inferred = hf_tokenizer.decode(
    #     generated_ids[0][input_ids.shape[-1]:], 
    #     skip_special_tokens=True, 
    #     clean_up_tokenization_space=True
    # )

    return jsonify({"inferred": inferred}), 200