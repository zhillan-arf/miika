import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";
import path from 'path';

const inferAct = async (chatsSysPrompt) => {
    return true;
    // const contexts = { recentChats: chatsSysPrompt }
    // const promptPath = path.resolve('prompts/inferences/inferAct.json');
    
    // const actPrompt = await makePrompt(contexts, promptPath);
    
    // try {
    //     const act = await infer(actPrompt);
    //     return act;
    
    // } catch (err) {
    //     console.error(err.stack);
    //     return null;
    // }
}

export default inferAct;