from flask import Blueprint, request, jsonify
import os, torch
from transformers import AutoTokenizer, AutoModelForCausalLM

os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'

torch.cuda.empty_cache()

def get_cache_path():
    fallback = 'llm_models'
    cache_path = os.environ.get('LLM_MODELS_DIR', fallback)
    if not os.path.exists(cache_path):
        cache_path = fallback
    return cache_path

cache_path = get_cache_path()
# hf_model_id = 'NousResearch/Nous-Hermes-2-Mistral-7B-DPO'
hf_model_id = "NousResearch/Hermes-2-Pro-Llama-3-8B"
quant = 'float16'  # 4 bit q

tokenizer = AutoTokenizer.from_pretrained(hf_model_id, cache_dir=cache_path)

model = AutoModelForCausalLM.from_pretrained(
    hf_model_id, 
    cache_dir=cache_path, 
    device_map='cuda',
    load_in_8bit=True,
    attn_implementation="flash_attention_2",
)

infer_bp = Blueprint('inference', __name__)

@infer_bp.route("/api/infer", methods=["POST"])
def infer():
    prompt = request.get_json().get('prompt')
    print("test")
    print(f"Prompt: {prompt}")
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