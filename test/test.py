import json, requests, re, datetime, time

userName = "Danny"
secName = "Mist"
date = datetime.datetime.now().strftime("%A, %d %B %Y")

with open('old/coreGuides.txt', 'r') as file:
    coreGuides = file.read()

with open('old/contextGuides.txt', 'r') as file:
    contextGuides = file.read()

with open('old/contextEpisodes.txt', 'r') as file:
    contextEpisodes = file.read()

with open('old/secIntent.txt', 'r') as file:
    secIntent = file.read()

with open('old/recentChats.txt', 'r') as file:
    recentChats = file.read()

with open('old/prompt.txt', 'r') as file:
    prompt = file.read()

# def index_queries(queries):
#     return ''.join([f"{idx + 1}. {query}\n" for idx, query in enumerate(queries)]).rstrip('\n')

# def index_text(texts):
#     return ''.join([f"{idx}. {text}\n" for idx, text in enumerate(texts)]).rstrip('\n')

contexts = {
    'coreGuides': coreGuides,
    'contextGuides': contextGuides,
    'contextEpisodes': contextEpisodes,
    'recentChats': recentChats,
    'userName': userName,
    'secName': secName,
    'secIntent': secIntent,
    'date': date
}

for key, value in contexts.items():
    regex = re.compile(r'{{' + re.escape(key) + r'}}')
    prompt = regex.sub(value, prompt)

print(prompt)

data = { 'prompt': prompt }

url = 'http://localhost:3001/api/infer'
headers = {'Content-Type': 'application/json'}

start_time = time.time()

response = requests.post(url, headers=headers, json=data)

# Check the response status code
if response.status_code == 200:
    end_time = time.time()
    print('Response:', response.json())
    print('Latency:' f'{end_time - start_time}')
else:
    print(f'Request failed with status code: {response.status_code}')