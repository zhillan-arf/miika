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

const fixIndexes = async (indexes) => {
    // Fix array
    if (typeof indexes === 'string') {
        const indexesMatch = indexes.match(/\[.*?\]/);
        if (!indexesMatch) throw Error('rerank: No indexes inferred'); 

        indexes = JSON.parse(indexesMatch[0]);
    }

    // Fix array content
    const formats = getFormat('assistant');

    const numIndexes = queries.map(elmt => {
        if (!isNaN(elmt) && typeof elmt === 'number' && isFinite(elmt)) {
            return elmt;
        }
        
        const pattern = new RegExp(`${formats.start}|${formats.end}`, 'g');
        const newElmt = elmt.replace(pattern, '').trim();

        if (newElmt !== '') return parseInt(newElmt);
        else return null;
    });

    const filterIndexes = numIndexes.filter(elmt => !elmt && elmt !== 0);

    return filterIndexes;
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
        const indexesRaw = await infer(rerankPrompt);
        const indexes = await fixIndexes(indexesRaw);

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