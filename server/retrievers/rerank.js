import makePrompt from "../functions/makePrompt.js";
import infer from "../inferences/infer.js";

const SERVICE_URI = process.env.SERVICE_URI;

const indexesValid = (obj) => {
    return Array.isArray(obj) && obj.every(item => typeof item === 'number');
}

const indexQueries = (queries) => {
    return queries.map((query, idx) => `${idx}. ${query}`).join('/n');
}

const indexEps = (eps) => {
    return eps.map((ep, idx) => `${idx}. ${ep.text}`).join('/n');
}

const rerank = async (queries, eps) => {
    if (!queries || !eps) return null;

    const contexts = { 
        queries: indexQueries(queries), 
        texts: indexEps(eps) 
    }

    const localPath = 'retrievers/rerank';
    const rerankPrompt = await makePrompt(contexts, localPath);

    try {
        const indexes = await JSON.parse(infer(rerankPrompt));

        if (indexesValid(indexes)) {
            return eps.filter((elmt, idx) => indexes.includes(idx));
        }
        
    } catch (err) {
        console.error(`ERROR rerank: ${err}`);
        return null;
    }
}

export default rerank;