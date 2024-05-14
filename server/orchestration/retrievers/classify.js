import chatsToText from "../chains/chatsToText";
import fillTemplate from "../chains/fillTemplate";

const makeClassPrompt = async (chatsText) => {
    const filePath = resolve('prompts/retriever/classify.txt');
    const template = await readFile(filePath, 'utf8');
    const variables = {
        chats: chatsText
    }
    const enoughPrompt = fillTemplate(template, variables);
    return enoughPrompt;
}

const classify = async (chats) => {
    const chatsText = chatsToText(chats);
    const prompt = makeClassPrompt(chatsText);

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
            return data.inferred;
        } else throw new Error('LLM server failure');

    } catch (err) {
        console.log(`isEnough ERR: ${err}`);
    }
}

export default classify;