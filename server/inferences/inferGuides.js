import makePrompt from "../functions/makePrompt.js";
import faiss from '../retrievers/faiss.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";

const inferGuides = async (recentChats, guides, secIntent) => {
    const hypoContexts = {
        recentChats: recentChats,
        secIntent: secIntent
    }

    const localPath = 'inference/inferGuides';
    const hypoPrompt = await makePrompt(hypoContexts, localPath);

    try {
        const queries = await JSON.parse(infer(hypoPrompt));
        const faissGuides = await faiss(queries, guides);
        return await rerank(queries, faissGuides);

    } catch(err) {
        console.error(`ERROR inferGuides: ${err}`);
        return null;
    }
}

export default inferGuides;