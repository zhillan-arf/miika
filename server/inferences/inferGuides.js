import makePrompt from "../functions/makePrompt.js";
import ann from '../retrievers/ann.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";
import path from 'path';

const fixQueries = async (queries) => {
    console.log('iG Initial queries: ', queries);  // debug
    console.log('iG Initial type: ', typeof queries);  // debug

    if (typeof obj === 'string') {
        const queriesMatch = await queries.match(/\[.*?\]/);
        if (!queriesMatch) throw Error('fQ: No queries inferred'); 

        queries = await JSON.parse(queriesMatch[0]);
        console.log('iG Parsed queries: ', JSON.stringify(queries));  // debug
        console.log('iG Initial type: ', typeof queries);  // debug
    }

    if (!Array.isArray(queries)) {
        throw Error('fQ: queries is not an array');
    }
    
    const trimmedQueries = queries.map(elmt => elmt.trim());
    console.log('iG fQ Trimmed queries:', trimmedQueries);  // debug

    return trimmedQueries;
}


const inferGuides = async (recentChatsText, guides, asIntentText) => {
    if (!guides || guides.length === 0) return null;
    
    const promptPath = path.resolve('prompts/inferences/inferGuides.json');

    const hypoContexts = {
        recentChats: recentChatsText,
        asIntent: asIntentText,
    }

    const hypoPrompt = await makePrompt(hypoContexts, promptPath);

    try {
        const queriesRaw = await infer(hypoPrompt);
        const queries = await fixQueries(queriesRaw);
        console.log(`iG q: ${JSON.stringify(queries)}`);  // debug

        const ANNGuides = await ann(queries, guides);

        const rerankGuides = await rerank(queries, ANNGuides);

        return rerankGuides;

    } catch(err) {
        console.error(`ERROR inferGuides: ${err.stack}`);
        return null;
    }
}

export default inferGuides;