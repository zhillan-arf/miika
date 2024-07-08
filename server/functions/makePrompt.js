import dataToText from "../functions/dataToText.js";
import { readFile } from 'fs/promises';

const getPromptText = async (promptPath) => {
    const promptBuffer = await readFile(promptPath);
    const promptData = JSON.parse(promptBuffer.toString());
    const promptText = dataToText(promptData);
    return promptText;
}

const makePrompt = async (contexts, promptPath) => {
    let promptText = await getPromptText(promptPath);

    console.log(`mP path: ${promptPath}`);  // debug
    console.log(`mP prompt: ${promptText}`);  // debug

    for (const key in contexts) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        promptText = promptText.replace(regex, contexts[key]);
    }    

    return promptText;
}

export default makePrompt;