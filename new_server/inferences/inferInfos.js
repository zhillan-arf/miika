import makePrompt from "../functions/makePrompt";
import infer from "./infer";

const inferInfos = async (recentChats, secIntent) => {
    const contexts = {
        recentChats: recentChats,
        secIntent: secIntent
    }

    const localPath = 'inference/inferInfos';
    const infosPrompt = await makePrompt(contexts, localPath);

    return await infer(infosPrompt);
}

export default inferInfos;