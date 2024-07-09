import makePrompt from "../functions/makePrompt.js";
import getRecentEps from "../functions/getRecentEps.js";
import wrapData from "../functions/wrapData.js";
import infer from "./infer.js";
import path from 'path';

const chatsTextClean = async (eps) => {
    let text = '';

    for (const ep of eps) {
        const data = ep.data;
        for (const datum of data) {
            text += datum.content;
        }
    }

    text = await wrapData('system', text);

    return text;
}

const inferAct = async (userID) => {
    const recentEps = await getRecentEps(userID);
    const recentChatsText = await chatsTextClean(recentEps);

    const contexts = { recentChats: recentChatsText }
    const promptPath = path.resolve('prompts/inferences/inferAct.json');
    
    const actPrompt = await makePrompt(contexts, promptPath);
    
    try {
        const act = await infer(actPrompt);
        return act;
    
    } catch (err) {
        console.error(err.stack);
        return null;
    }
}

export default inferAct;