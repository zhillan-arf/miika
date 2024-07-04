import makePrompt from "../functions/makePrompt.js";
import faiss from '../retrievers/faiss.js'
import rerank from '../retrievers/rerank.js'
import infer from "./infer.js";

import { readFile } from 'fs/promises';
import path from 'path';

const inferGuides = async (recentChats, guides, asIntent) => {
    const hypoContexts = {
        recentChats: recentChats,
        asIntent: asIntent,
        userName: 'danny' // temp debug
    }

    const localPath = 'inferences/inferGuides';
    const hypoPrompt = await makePrompt(hypoContexts, localPath);

    // try {
    //     const queries = await JSON.parse(infer(hypoPrompt));
    //     const faissGuides = await faiss(queries, guides);
    //     return await rerank(queries, faissGuides);

    // } catch(err) {
    //     console.error(`ERROR inferGuides: ${err}`);
    //     return null;
    // }  // debug

    const filePath = path.resolve(`inferences/contextGuides.txt`);  // temp debug
    const buffer = await readFile(filePath, 'utf8');  // temp debug
    return buffer.toString();
}

export default inferGuides;