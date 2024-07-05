import os
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from sentence_transformers import SentenceTransformer

os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'

# Paths and IDs
def get_cache_path():
    fallback = 'llm_models'
    cache_path = os.getenv('LLM_MODELS_DIR', fallback)
    if not os.path.exists(cache_path):
        cache_path = fallback
    return cache_path

cache_path = get_cache_path()

hf_model_id = 'meta-llama/Meta-Llama-3-8B'
hf_token = os.getenv('HF_API_TOKEN')

# HF ModeTokenizer
hf_tokenizer = AutoTokenizer.from_pretrained(
    hf_model_id,
    cache_dir=cache_path,
    token=hf_token
)

# HF Model
bitsAndBytesConfig = BitsAndBytesConfig(
    load_in_8bit = True
)

hf_model = AutoModelForCausalLM.from_pretrained(
    hf_model_id, 
    cache_dir=cache_path, 
    device_map='cuda',
    quantization_config = bitsAndBytesConfig,
    attn_implementation="flash_attention_2",
    token=hf_token
)

# HF Encoder
hf_encoder_id = 'distilbert-base-nli-stsb-mean-tokens'
hf_encoder = SentenceTransformer(hf_encoder_id)