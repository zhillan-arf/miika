import chatsToText from "../chains/chatsToText";
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import fillTemplate from "../chains/fillTemplate";

const MICROSERVICE_URI = process.env.MICROSERVICE_URI;

const makeEnoughPrompt = async (chatsText) => {
    const filePath = resolve('prompts/retriever/isEnough.txt');
    const template = await readFile(filePath, 'utf8');
    const variables = {
        chats: chatsText
    }
    const enoughPrompt = fillTemplate(template, variables);
    return enoughPrompt;
}

const isEnough = async (chats) => {
    const chatsText = chatsToText(chats);
    const prompt = makeEnoughPrompt(chatsText);

    try {
        const response = await fetch(`${MICROSERVICE_URI}/api/infer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: prompt})
        });

        if (response.ok) {
            const data = await response.json();
            const inferred = data.inferred;
            return inferred === 'Yes';
        } else throw new Error('LLM server failure');

    } catch (err) {
        console.log(`isEnough ERR: ${err}`);
    }
}

export default isEnough;