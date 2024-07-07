import dataToText from "../functions/dataToText.js";
import { readFile } from 'fs/promises';

const getPromptText = async (promptPath) => {
    const promptBuffer = await readFile(promptPath, 'utf8');
    const promptData = JSON.parse(promptBuffer.toString());
    const prompText = dataToText(promptData);
    return prompText;
}

const makePrompt = async (contexts, promptPath) => {
    let prompText = getPromptText(promptPath);

    for (const key in contexts) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        prompText = prompText.replace(regex, contexts[key]);
    }    

    return prompText;
}

export default makePrompt;