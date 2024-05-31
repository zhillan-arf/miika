import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";

const inferThoughts = async (recentDailys, recentMonologues, recentChats, secIntent) => {
    const contexts = {
        recentDailys: recentDailys,
        recentMonologues: recentMonologues,
        recentChats: recentChats,
        secIntent: secIntent
    }

    const localPath = 'inference/inferThoughts';
    const infosPrompt = await makePrompt(contexts, localPath);

    return await infer(infosPrompt);
}

export default inferThoughts;