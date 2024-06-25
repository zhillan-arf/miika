import json
import requests
import re

with open('prompt.txt', 'r') as file:
    prompt = file.read()

userName = "danny"
secName = "mist"

with open('contextGuides.txt', 'r') as file:
    contextGuides = file.read()

with open('contextEpisodes.txt', 'r') as file:
    contextEpisodes = file.read()

with open('recentChats.txt', 'r') as file:
    recentChats = file.read()

# def index_queries(queries):
#     return ''.join([f"{idx + 1}. {query}\n" for idx, query in enumerate(queries)]).rstrip('\n')

# def index_text(texts):
#     return ''.join([f"{idx}. {text}\n" for idx, text in enumerate(texts)]).rstrip('\n')

contexts = {
    'contextGuides': contextGuides,
    'contextEpisodes': contextEpisodes,
    'recentChats': recentChats,
    'userName': userName,
    'secName': secName
}

for key, value in contexts.items():
    regex = re.compile(r'{{' + re.escape(key) + r'}}')
    prompt = regex.sub(value, prompt)

print(prompt)

data = { 'prompt': prompt }

url = 'http://localhost:3001/api/infer'
headers = {'Content-Type': 'application/json'}

response = requests.post(url, headers=headers, json=data)

# Check the response status code
if response.status_code == 200:
    print('Response:', response.json())
else:
    print(f'Request failed with status code: {response.status_code}')

