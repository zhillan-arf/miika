import makePrompt from "../functions/makePrompt";
import infer from "./infer";

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