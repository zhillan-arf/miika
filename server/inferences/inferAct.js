import infer from "./infer.js";
import makePrompt from "../functions/makePrompt.js";

const inferAct = async (recentChats) => {
    const contexts = { recentChats: recentChats }
    const localPath = 'inference/inferAct';
    const actPrompt = await makePrompt(contexts, localPath);
    
    let act = true;
    try {
        const act = await JSON.parse(infer(actPrompt).act);
    
    } catch (err) {
        console.error(err);
        return null;
    }

    return act;
}

export default inferAct;