import makePrompt from "../functions/makePrompt.js";
import infer from "../inferences/infer.js";

const SERVICE_URI = process.env.SERVICE_URI;

const indexesValid = (obj) => {
    return Array.isArray(obj) && obj.every(item => typeof item === 'number');
}

const rerank = async (query, docs) => {
    if (!queries || !docs) return null;

    const contexts = { query: query, docs: docs }
    const localPath = 'retrievers/rerank';
    const rerankPrompt = await makePrompt(contexts, localPath);

    try {
        const indexes = await JSON.parse(infer(rerankPrompt));

        if (indexesValid(indexes)) {
            return docs.filter((elmt, idx) => indexes.includes(idx));
        }
        
    } catch (err) {
        console.error(`ERROR rerank: ${err}`);
        throw err;
    }
}

export default rerank;