import json
import requests

# Read the file
with open('prompts.txt', 'r') as file:
    prompt = file.read()
    data = json.dumps({ 'prompt': prompt })

# Send a POST request with the JSON data
url = 'http://localhost:3001/api/infer'
headers = {'Content-Type': 'application/json'}

print('Request:')
print(prompt)

response = requests.post(url, headers=headers, json=data)

# Check the response status code
if response.status_code == 200:
    print('Response:', response.json())
else:
    print(f'Request failed with status code: {response.status_code}')