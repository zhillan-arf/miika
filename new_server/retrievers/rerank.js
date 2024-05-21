import makePrompt from "../functions/makePrompt";
import infer from "../inferences/infer";

const SERVICE_URI = process.env.SERVICE_URI;

const indexesValid = (obj) => {
    return Array.isArray(obj) && obj.every(item => typeof item === 'number');
}

const rerank = async (query, docs) => {
    const contexts = { query: query, docs: docs }
    const localPath = 'retrievers/rerank';
    const rerankPrompt = await makePrompt(contexts, localPath);

    try {
        const indexes = await JSON.parse(infer(rerankPrompt));

        if (indexesValid(indexes)) {
            return docs.filter((elmt, idx) => indexes.includes(idx));
        }
        
    } catch (err) {
        console.log(`ERROR rerank: ${err}`);
        throw err;
    }
}

export default rerank;