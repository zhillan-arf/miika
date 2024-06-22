import json
import requests
import re

with open('prompt.txt', 'r') as file:
    prompt = file.read()

with open('queries.txt', 'r') as file:
    queries = file.read()

with open('texts.txt', 'r', encoding='utf-8-sig') as file:
    texts = file.read()

userName = "Miiki"

def index_queries(queries):
    return ''.join([f"{idx}. {query}\n" for idx, query in enumerate(queries)]).rstrip('\n')

contexts = {
    'queries': index_queries(json.loads(queries)),
    'texts': index_queries(json.loads(texts)),
    'userName': userName
}

for key, value in contexts.items():
    regex = re.compile(r'{{' + re.escape(key) + r'}}')
    prompt = regex.sub(value, prompt)

print(prompt)

# data = { 'prompt': prompt }

# url = 'http://localhost:3001/api/infer'
# headers = {'Content-Type': 'application/json'}

# response = requests.post(url, headers=headers, json=data)

# # Check the response status code
# if response.status_code == 200:
#     print('Response:', response.json())
# else:
#     print(f'Request failed with status code: {response.status_code}')

