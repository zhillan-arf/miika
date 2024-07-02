import makePrompt from "../functions/makePrompt.js";
import faiss from '../retrievers/faiss.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";

import readFile from 'fs/promises';
import path from 'path';

const inferEpisodes = async (recentChats, episodes, asIntent) => {
    // if (!recentChats || recentChats.length === 0) return null;
    
    // const hypoContexts = {
    //     recentChats: recentChats,
    //     asIntent: asIntent
    // }

    // const localPath = 'inference/inferEpisodes';
    // const hypoPrompt = await makePrompt(hypoContexts, localPath);

    // try {
    //     const queries = await JSON.parse(infer(hypoPrompt));
    //     const faissEpisodes = await faiss(queries, episodes);
    //     return await rerank(queries, faissEpisodes);

    // } catch(err) {
    //     console.error(`ERROR inferEpisodes: ${err}`);
    //     return null;
    // }

    const filePath = path.resolve(`inferences/contextEpisodes.txt`);  // debug
    return await readFile(filePath, 'utf8');  // debug
}

export default inferEpisodes;