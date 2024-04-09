from flask import request, jsonify
from app import app
import os, torch

os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'
this_path = os.path.dirname(os.path.realpath(__file__))
models_cache = os.path.join(this_path, 'llm_models')  # Name of directory

torch.cuda.empty_cache()

from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
hf_model_id = "NousResearch/Nous-Hermes-2-Mistral-7B-DPO"
tokenizer = AutoTokenizer.from_pretrained(hf_model_id, cache_dir=models_cache)

bits_and_bytes_config = BitsAndBytesConfig(
    compute_dtype='float16',  # 4 bit quantization
    activation_dtype='float16',
    bnb_4bit_compute_dtype='float16'
) 

model = AutoModelForCausalLM.from_pretrained(
    hf_model_id, 
    cache_dir=models_cache, 
    device_map='cuda',
    quantization_config=bits_and_bytes_config,
    attn_implementation="flash_attention_2"
)

@app.route("/api/infer", methods=["POST"])
def infer():
    input = request.data.decode("utf-8")
    if not input:
        return jsonify({"error": "No input provided"}), 400

    input_ids = tokenizer(input, return_tensors="pt").input_ids.to("cuda")
    attn_mask = torch.ones_like(input_ids)
    generated_ids = model.generate(
        input_ids, 
        attention_mask=attn_mask,
        max_new_tokens=200, 
        temperature=0.8, 
        repetition_penalty=1.1, 
        do_sample=True, 
        eos_token_id=tokenizer.eos_token_id
    )
    inferred = tokenizer.decode(generated_ids[0][input_ids.shape[-1]:], 
                                skip_special_tokens=True, 
                                clean_up_tokenization_space=True
    )

    return jsonify({"inferred": inferred}), 200