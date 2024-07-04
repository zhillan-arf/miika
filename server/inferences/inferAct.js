import infer from "./infer.js";
import makePrompt from "../functions/makePrompt.js";

const inferAct = async (recentChats) => {
    const contexts = { recentChats: recentChats }
    const localPath = 'inferences/inferAct';
    const actPrompt = await makePrompt(contexts, localPath);
    
    let act = true;
    try {
        const inferred = await infer(actPrompt);
        const act = await JSON.parse(inferred);
    
    } catch (err) {
        console.error(err);
        return null;
    }

    return act;
}

export default inferAct;