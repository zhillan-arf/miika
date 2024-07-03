import requests
from datetime import datetime
from bson import ObjectId

url = 'http://localhost:3002'

with open('../server/prompts/assistants/mist/oriIntent.txt') as file:
    asIntent = file.read()

print(asIntent)

user = {
        '_id': ObjectId('6684fbb0b89d3f378019b454'),
        'email': 'danny@lovinf.ai',
        'hash': '$2b$10$1eEK7PdgarRCDU03WT5JauWe/bS7PIqjzv9aPBAfd8sfPuV0n/MbO',
        'assistantID': ObjectId('6683992cbf35d4c88c737f2f'),
        'name': 'danny@lovinf.ai',
        'asIntent': asIntent
    }

while True:
    userInput = input("USER: ")

    chat = {
        'role': 'user',
        'content': f'<im_start>user\nUSER: {userInput}<|im_end|>',
        'date': datetime.now().strftime("%a %b %d %H:%M:%S %Y"),
    }

    payload = {
        'user': user,
        'chat': chat
    }

    insertChat = requests.post(f'{url}/api/insertchat', json=payload)

    