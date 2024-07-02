import readFile from 'fs/promises';
import path from 'path';

const makePrompt = async (contexts, localPath) => {
    const filePath = path.resolve(`prompts/${localPath}.txt`);
    let prompt = await readFile(filePath, 'utf8');

    for (const key in contexts) {
        const regex = new RegExp(`{{${key}}}, 'g`);
        prompt = prompt.replace(regex. contexts[key]);
    }

    return prompt;
}

export default makePrompt;