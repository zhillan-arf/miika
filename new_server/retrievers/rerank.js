const SERVICE_URI = process.env.SERVICE_URI;

const rerank = async (query, docs, minLogit) => {
    try {
        const response = await fetch(`${SERVICE_URI}/api/rerank`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: query,
                docs: docs,
                minLogit: minLogit
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        const indexes = await response.json();
        return docs.filter((elmt, idx) => indexes.includes(idx));
        
    } catch (err) {
        console.log(`ERROR rerank: ${err}`);
        throw err;
    }
}

export default rerank;