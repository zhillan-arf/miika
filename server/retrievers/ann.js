const SERVICE_URI = process.env.SERVICE_URI;

const ann = async (queries, docs) => {
    try {
        if (!queries || !docs) return null;

        const response = await fetch(`${SERVICE_URI}/api/ann`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({queries: queries, docs: docs})
        });

        const data = await response.json();
        
        if (response.ok) return data.filtered;

        else {
            console.error(`ERROR ANN response: ${data.error}`);
            return null;
        }

    } catch (err) {
        console.error(`ERROR ANN: ${err.stack}`);
        return null;
    }
}

export default ann;