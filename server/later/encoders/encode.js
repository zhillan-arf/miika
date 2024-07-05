import { SERVICE_URI } from '../../index.js';

const encode = async (text) => {
    try {
        const response = await fetch(`${SERVICE_URI}/api/encode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: text})
        });
        
        if (response.ok) return await response.json().embedding;
        else throw Error(`encode Response not ok: ${response}`);
        
    } catch (err) {
        console.error(`ERROR encode: ${err.message} // ${err.stack}`);
        return null;
    }
}

export default encode();