import { config } from 'dotenv';
config();

import parseNewChats from '../chains/parseNewChats.js';

const MICROSERVICE_URI = process.env.MICROSERVICE_URI;

const makeInference = async (systemPrompt, userPrompt, user) => {
    const prompt = `<|im_start|>system\n${systemPrompt}\n<|im_start|>user\n${userPrompt}\n<|im_start|>assistant`;

    try {
        const inferred = "debug message 1\ndebug message 2\ndebug message 3";  // debug
        return parseNewChats(inferred, user);  // debug

        // console.log(`URI: ${MICROSERVICE_URI}`);  // debug
        // const response = await fetch(`${MICROSERVICE_URI}/api/infer`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({prompt: prompt})
        // });

        // if (response.ok) {
        //     const data = await response.json();
        //     const inferred = data.inferred;
        //     console.log(`returned: ${data}`);  // debug
        //     return parseNewChats(inferred, user);
        // } else throw new Error('LLM server failure');

    } catch (err) {
        console.log(`Make inference: ${err}`)
    }
}

export default makeInference;