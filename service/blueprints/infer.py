from flask import Blueprint, request, jsonify
from resources.resources import tokenizer, model
import os, torch, json

infer_bp = Blueprint('infer', __name__)

@infer_bp.route("/api/infer", methods=["POST"])
def infer():
    prompt = request.get_json().get('prompt')
    if not prompt:
        return jsonify({"error": "No input provided"}), 400

    input_ids = tokenizer(prompt, return_tensors="pt").input_ids.to("cuda")
    attn_mask = torch.ones_like(input_ids)

    generated_ids = model.generate(
        input_ids, 
        attention_mask=attn_mask,
        max_new_tokens=150, 
        temperature=0.85, 
        repetition_penalty=1.1, 
        do_sample=True, 
        eos_token_id=tokenizer.eos_token_id
    )

    inferred = tokenizer.decode(
        generated_ids[0][input_ids.shape[-1]:], 
        skip_special_tokens=True, 
        clean_up_tokenization_space=True
    )

    return jsonify({"inferred": inferred}), 200