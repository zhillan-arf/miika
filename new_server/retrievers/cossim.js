const SERVICE_URI = process.env.SERVICE_URI;

const cossim = async (embeddings, queryEmbedding, threshold) => {
    try {
        const response = await fetch(`${SERVICE_URI}/api/cossim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeddings: embeddings,
                queryEmbedding: queryEmbedding,
                threshold: threshold
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        return await response.json();
        
    } catch (err) {
        console.log(`ERROR cossim: ${err}`);
        throw err;
    }
}

export default cossim;