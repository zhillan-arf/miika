const SERVICE_URI = process.env.SERVICE_URI;

const cossim = async (docs, embeddings, queryEmbedding, minCosSim) => {
    try {
        const response = await fetch(`${SERVICE_URI}/api/cossim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeddings: embeddings,
                queryEmbedding: queryEmbedding,
                minCosSim: minCosSim
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        const indexes = await response.json();
        return docs.filter((elmt, idx) => indexes.includes(idx));
        
    } catch (err) {
        console.log(`ERROR cossim: ${err}`);
        throw err;
    }
}

export default cossim;