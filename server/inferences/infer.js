import { SERVICE_URI } from '../index.js';

const infer = async (prompt) => {
    // console.debug(`infer prompt: ${prompt}\n\n\n`);  // debug
    try {
        const response = await fetch(`${SERVICE_URI}/api/infer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({prompt: prompt})
        });
        
        if (response.ok) {
            const data = await response.json()
            // console.debug(`infer response: ${data.inferred}\n\n\n`);  // debug
            return data.inferred;
        }
        else throw Error(`Response not ok: ${response}`);
        
    } catch (err) {
        console.error(`ERROR infer: ${err.message} // ${err.stack}`);
        return null;
    }
}

export default infer;