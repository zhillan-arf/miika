import makePrompt from "../functions/makePrompt.js";
import infer from "../inferences/infer.js";

const indexesValid = (obj) => {
    return Array.isArray(obj) && obj.every(item => typeof item === 'number');
}

const indexQueries = (queries) => {
    return queries.map((query, idx) => `${idx}. ${query}`).join('/n');
}

const indexDocs = (docs) => {
    return docs.map((guide, idx) => `${idx}. ${guide.summary}`).join('/n');
}

const rerank = async (queries, docs) => {  // guides and eps
    if (!queries || !docs) return null;

    const contexts = { 
        queries: indexQueries(queries), 
        texts: indexDocs(docs) 
    }

    const promptPath = path.resolve('prompts/retrievers/rerank.json');
    const rerankPrompt = await makePrompt(contexts, promptPath);

    try {
        const indexes = await JSON.parse(infer(rerankPrompt));

        if (indexesValid(indexes)) {
            const selectedDocs = docs.filter((elmt, idx) => indexes.includes(idx));
            return selectedDocs;
        }
        
    } catch (err) {
        console.error(`ERROR rerank: ${err.message} // ${err.stack}`);
        return null;
    }
}

export default rerank;