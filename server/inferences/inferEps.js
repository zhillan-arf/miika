import makePrompt from "../functions/makePrompt.js";
import ann from '../retrievers/ann.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";
import path from 'path';

const inferEps = async (chatsSysPrompt, eps, asIntentPrompt) => {
    if (!eps || eps.length === 0) return null;

    const promptPath = path.resolve('prompts/inferences/inferEps.json');
    
    const hypoContexts = {
        recentChats: chatsSysPrompt,
        asIntent: asIntentPrompt
    }

    const hypoPrompt = await makePrompt(hypoContexts, promptPath);

    try {
        const queries = await JSON.parse(infer(hypoPrompt));
        const ANNEps = await ann(queries, eps);
        const rerankEps = await rerank(queries, ANNEps);
        return rerankEps;

    } catch(err) {
        console.error(`ERROR inferEps: ${err.message} // ${err.stack}`);
        return null;
    }
}

export default inferEps;