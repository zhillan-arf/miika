const SERVICE_URI = process.env.SERVICE_URI;

const infer = async (prompt) => {
    try {
        const response = await fetch(`${SERVICE_URI}/api/infer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({prompt: prompt})
        });
        
        if (response.ok) return await response.json().inferred;
        else throw Error(`Response not ok: ${response}`);
        
    } catch (err) {
        console.log(`ERROR infer: ${err}`);
        throw err;
    }
}

export default infer;