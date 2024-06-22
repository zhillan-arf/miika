import json
import requests
import re

with open('prompt.txt', 'r') as file:
    prompt = file.read()

with open('recentChats.txt', 'r') as file:
    recentChats = file.read()

with open('secIntent.txt', 'r') as file:
    secIntent = file.read()

userName = "danny"

contexts = {
    'recentChats': recentChats,
    'secIntent': secIntent,
    'userName': userName
}

for key, value in contexts.items():
    regex = re.compile(r'{{' + re.escape(key) + r'}}')
    prompt = regex.sub(value, prompt)

# print(prompt)

data = { 'prompt': prompt }

url = 'http://localhost:3001/api/infer'
headers = {'Content-Type': 'application/json'}

response = requests.post(url, headers=headers, json=data)

# Check the response status code
if response.status_code == 200:
    print('Response:', response.json())
else:
    print(f'Request failed with status code: {response.status_code}')

