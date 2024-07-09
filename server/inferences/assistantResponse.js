import makePrompt from "../functions/makePrompt.js";
import getFormatDate from "../functions/getFormatDate.js";
import textToData from "../functions/textToData.js";
import infer from "./infer.js";
import path from 'path';

const assistantResponse = async (asName, userName, corePrompt, contextPrompt, epsPrompt, intentPrompt, chatsPrompt) => {
    const contexts = {
        coreGuides: corePrompt,
        contextGuides: contextPrompt,
        contextEpisodes: epsPrompt,
        asIntent: intentPrompt,
        date: getFormatDate(),
        recentChats: chatsPrompt,
        asName: asName,
        userName: userName,
    }

    const promptPath = path.resolve(`prompts/assistants/${asName}/assistantResponse.json`);
    const responsePrompt = await makePrompt(contexts, promptPath);

    const responseText = await infer(responsePrompt);
    
    const responses = await textToData(responseText);  // arr of str

    return responses;
}

export default assistantResponse;