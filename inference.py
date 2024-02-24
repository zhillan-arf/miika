# !!!CALAMITY-LEVEL WARNING!!!
# YOU NEED A GPU RAM OF MINIMUM 6GB TO RUN THIS PROGRAM
# YOU ALSO NEED TO SET UP THE CUDA FOR THE GPU FIRST
# DO NOT RUN THIS PROGRAM IF YOU DON'T

# Inference to the LLM

import os
os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'

import torch
torch.cuda.empty_cache()

from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig

hf_model_id = "NousResearch/Nous-Hermes-2-Mistral-7B-DPO"
models_cache = "./models"

tokenizer = AutoTokenizer.from_pretrained(hf_model_id, cache_dir=models_cache)

bits_and_bytes_config = BitsAndBytesConfig(
    compute_dtype='float16',  #float16 = 4 bit quantization
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

prompts = [
    """<|im_start|>system
You are Mistley, a cheerful couseling agent tasked to listen to people's worries and comfort them.<|im_end|>
<|im_start|>user
Hello... who is this?<|im_end|>
<|im_start|>assistant""",
    ]

for chat in prompts:
    print(chat)
    input_ids = tokenizer(chat, return_tensors="pt").input_ids.to("cuda")
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
    response = tokenizer.decode(generated_ids[0][input_ids.shape[-1]:], 
                                skip_special_tokens=True, 
                                clean_up_tokenization_space=True
    )
    print(f"Response: {response}")