import json
import requests
import re

path = 'test.txt'

with open(path, 'r') as file:
    prompt = file.read()

contexts = {}

for key in contexts:
    regex = re.compile(r'{{' + re.escape(key) + r'}}')
    prompt = regex.sub(contexts[key], prompt)

data = { 'prompt': prompt }

url = 'http://localhost:3001/api/infer'
headers = {'Content-Type': 'application/json'}

response = requests.post(url, headers=headers, json=data)

# Check the response status code
if response.status_code == 200:
    print('Response:', response.json())
else:
    print(f'Request failed with status code: {response.status_code}')