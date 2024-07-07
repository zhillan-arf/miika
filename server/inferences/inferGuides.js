import makePrompt from "../functions/makePrompt.js";
import faiss from '../retrievers/faiss.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";
import path from 'path';

const inferGuides = async (recentChatsText, guides, asIntentText) => {
    if (!guides || guides.length === 0) return null;
    
    const promptPath = path.resolve('prompts/inferences/inferGuides.json');

    const hypoContexts = {
        recentChats: recentChatsText,
        asIntent: asIntentText,
    }

    const hypoPrompt = await makePrompt(hypoContexts, promptPath);

    try {
        const queries = await JSON.parse(infer(hypoPrompt));
        const faissGuides = await faiss(queries, guides);
        const rerankGuides = await rerank(queries, faissGuides);
        return rerankGuides;

    } catch(err) {
        console.error(`ERROR inferGuides: ${err.message} // ${err.stack}`);
        return null;
    }
}

export default inferGuides;