import makePrompt from "../functions/makePrompt.js";
import faiss from '../retrievers/faiss.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";

const inferEpisodes = async (recentChats, episodes, secIntent) => {
    if (!recentChats || recentChats.length === 0) return null;
    
    const hypoContexts = {
        recentChats: recentChats,
        secIntent: secIntent
    }

    const localPath = 'inference/inferEpisodes';
    const hypoPrompt = await makePrompt(hypoContexts, localPath);

    try {
        const queries = await JSON.parse(infer(hypoPrompt));
        const faissEpisodes = await faiss(queries, episodes);
        return await rerank(queries, faissEpisodes);

    } catch(err) {
        console.error(`ERROR inferEpisodes: ${err}`);
        return null;
    }
}

export default inferEpisodes;