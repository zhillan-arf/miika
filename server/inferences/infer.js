import { SERVICE_URI } from '../index.js';

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
        console.error(`ERROR infer: ${err}`);
        return null;
    }
}

export default infer;