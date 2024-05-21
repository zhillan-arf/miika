import os, torch, json
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig

os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'

def get_cache_path():
    fallback = 'llm_models'
    cache_path = os.environ.get('LLM_MODELS_DIR', fallback)
    if not os.path.exists(cache_path):
        cache_path = fallback
    return cache_path

cache_path = get_cache_path()
hf_model_id = "NousResearch/Hermes-2-Pro-Llama-3-8B"

tokenizer = AutoTokenizer.from_pretrained(hf_model_id, cache_dir=cache_path)

bitsAndBytesConfig = BitsAndBytesConfig(
    load_in_8bit = True
)

model = AutoModelForCausalLM.from_pretrained(
    hf_model_id, 
    cache_dir=cache_path, 
    device_map='cuda',
    quantization_config = bitsAndBytesConfig,
    attn_implementation="flash_attention_2",
)