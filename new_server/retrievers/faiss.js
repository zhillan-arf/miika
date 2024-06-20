const SERVICE_URI = process.env.SERVICE_URI;

const faiss = async (queries, docs) => {
    try {
        if (!queries || !docs) return null;

        const response = await fetch(`${SERVICE_URI}/api/faiss`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({queries: queries, docs: docs})
        });

        return response.json()

    } catch (err) {
        console.error(`ERROR infer: ${err}`);
        throw err;
    }
}

export default faiss;