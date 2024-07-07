import infer from "./infer.js";
import makePrompt from "../functions/makePrompt.js";
import path from 'path';

const inferAct = async (recentChats) => {
    const contexts = { recentChats: recentChats }
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