import makePrompt from "../functions/makePrompt.js";
import faiss from '../retrievers/faiss.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";
import path from 'path';

const inferEps = async (recentChatsText, eps, asIntentText) => {
    if (!episodes || episodes.length === 0) return null;

    const promptPath = path.resolve('prompts/inferences/inferEpisodes.json');
    
    const hypoContexts = {
        recentChats: recentChatsText,
        asIntent: asIntentText
    }

    const hypoPrompt = await makePrompt(hypoContexts, promptPath);

    try {
        const queries = await JSON.parse(infer(hypoPrompt));
        const faissEps = await faiss(queries, eps);
        const rerankEps = await rerank(queries, faissEps);
        return rerankEps;

    } catch(err) {
        console.error(`ERROR inferEps: ${err.message} // ${err.stack}`);
        return null;
    }
}

export default inferEps;