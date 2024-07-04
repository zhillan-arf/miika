import os, torch, json
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from sentence_transformers import SentenceTransformer
from vllm import LLM
from dotenv import load_dotenv

load_dotenv()
os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'

def get_cache_path():
    fallback = 'llm_models'
    cache_path = os.environ.get('LLM_MODELS_DIR', fallback)
    if not os.path.exists(cache_path):
        cache_path = fallback
    return cache_path

cache_path = get_cache_path()
hf_model_id = 'meta-llama/Meta-Llama-3-8B'
hf_token = os.getenv('HF_API_TOKEN')

hf_tokenizer = AutoTokenizer.from_pretrained(
    hf_model_id, 
    cache_dir=cache_path, 
    token=hf_token
)

bitsAndBytesConfig = BitsAndBytesConfig(
    load_in_4bit = True
)

hf_model = AutoModelForCausalLM.from_pretrained(
    hf_model_id, 
    cache_dir=cache_path, 
    device_map='cuda',
    quantization_config = bitsAndBytesConfig,
    attn_implementation="flash_attention_2",
    token=hf_token
)

# model = LLM(model=hf_model, tokenizer=hf_tokenizer)

hf_encoder_id = 'distilbert-base-nli-stsb-mean-tokens'
encoder = SentenceTransformer(hf_encoder_id)