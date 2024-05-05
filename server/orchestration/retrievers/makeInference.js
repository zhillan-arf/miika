import { config } from 'dotenv';
config();

import parseNewChats from '../chains/parseNewChats.js';

const MICROSERVICE_URI = process.env.MICROSERVICE_URI;

const makeInference = async (systemPrompt, userPrompt, user) => {
    const prompt = `<|im_start|>system\n${systemPrompt}\n<|im_start|>user\n${userPrompt}\n<|im_start|>assistant`;

    try {
        console.log(`URI: ${MICROSERVICE_URI}`);  // debug
        const response = await fetch(`${MICROSERVICE_URI}/api/infer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: prompt})
        });

        if (response.ok) {
            const inferred = await response.json().inferred
            console.log(`returned: ${inferred}`);  // debug
            return parseNewChats(inferred, user);
        } else throw new Error('LLM server failure');

    } catch (err) {
        console.log(`${err}`)
    }
}

export default makeInference;