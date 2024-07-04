import makePrompt from "../functions/makePrompt.js";
import faiss from '../retrievers/faiss.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";

import readFile from 'fs/promises';  // temp debug
import path from 'path';  // temp debug

const inferEpisodes = async (recentChats, episodes, asIntent) => {
    const nullText = 'There is currently no relevant memory.'
    if (!recentChats || recentChats.length === 0) return nullText;
    
    const hypoContexts = {
        recentChats: recentChats,
        asIntent: asIntent
    }

    const localPath = 'inference/inferEpisodes';
    const hypoPrompt = await makePrompt(hypoContexts, localPath);

    // try {
    //     const queries = await JSON.parse(infer(hypoPrompt));
    //     const faissEpisodes = await faiss(queries, episodes);
    //     return await rerank(queries, faissEpisodes);

    // } catch(err) {
    //     console.error(`ERROR inferEpisodes: ${err}`);
    //     return nullText;
    // }  // debug

    // const filePath = path.resolve(`inferences/contextEpisodes.txt`);  // temp debug
    // const buffer = await readFile(filePath, 'utf8');  // temp debug
    // return buffer.toString();  // temp debug

    return nullText;
}

export default inferEpisodes;