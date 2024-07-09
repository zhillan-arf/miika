import makePrompt from "../functions/makePrompt.js";
import fixQueries from "../functions/fixQueries.js";
import ann from '../retrievers/ann.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";
import path from 'path';

const inferGuides = async (chatsSysPrompt, guides, asIntentPrompt) => {
    if (!guides || guides.length === 0) return null;
    
    const promptPath = path.resolve('prompts/inferences/inferGuides.json');

    const hypoContexts = {
        recentChats: chatsSysPrompt,
        asIntent: asIntentPrompt,
    }

    const hypoPrompt = await makePrompt(hypoContexts, promptPath);

    try {
        const queriesRaw = await infer(hypoPrompt);
        const queries = await fixQueries(queriesRaw);

        const ANNGuides = await ann(queries, guides);

        const rerankGuides = await rerank(queries, ANNGuides);

        return rerankGuides;

    } catch(err) {
        console.error(`ERROR inferGuides: ${err.stack}`);
        return null;
    }
}

export default inferGuides;