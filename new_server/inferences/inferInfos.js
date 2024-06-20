import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";

const inferInfos = async (recentChats, secIntent) => {  // Implements HyDE
    const contexts = {
        recentChats: recentChats,
        secIntent: secIntent
    }

    const localPath = 'inference/inferInfos';
    const infosPrompt = await makePrompt(contexts, localPath);

    return await infer(infosPrompt);
}

export default inferInfos;