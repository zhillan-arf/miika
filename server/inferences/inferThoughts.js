import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";

const inferThoughts = async (recentDailys, recentMonologues, recentChats, asIntent) => {
    const contexts = {
        recentDailys: recentDailys,
        recentMonologues: recentMonologues,
        recentChats: recentChats,
        asIntent: asIntent
    }

    const localPath = 'inferences/inferThoughts';
    const infosPrompt = await makePrompt(contexts, localPath);

    return await infer(infosPrompt);
}

export default inferThoughts;