import json
import requests

path = 'test.txt'

with open(path, 'r') as file:
    prompt = file.read()
    data = { 'prompt': prompt }

url = 'http://localhost:3001/api/infer'
headers = {'Content-Type': 'application/json'}

response = requests.post(url, headers=headers, json=data)

# Check the response status code
if response.status_code == 200:
    print('Response:', response.json())
else:
    print(f'Request failed with status code: {response.status_code}')