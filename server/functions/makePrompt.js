import { readFile } from 'fs/promises';
import path from 'path';

const makePrompt = async (contexts, localPath) => {
    const filePath = path.resolve(`prompts/${localPath}.txt`);
    const promptBuffer = await readFile(filePath, 'utf8');
    let prompt = promptBuffer.toString();

    for (const key in contexts) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        prompt = prompt.replace(regex, contexts[key]);
    }    

    return prompt;
}

export default makePrompt;