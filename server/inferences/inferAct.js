import infer from "./infer.js";
import makePrompt from "../functions/makePrompt.js";

const inferAct = async (recentChats) => {
    const contexts = { recentChats: recentChats }
    const localPath = 'inferences/inferAct';
    const actPrompt = await makePrompt(contexts, localPath);
    
    let act = true;
    try {
        const act = await infer(actPrompt);
        console.log(`inferAct: ${act}`);  // debug
    
    } catch (err) {
        console.error(err);
        return null;
    }

    return act;
}

export default inferAct;