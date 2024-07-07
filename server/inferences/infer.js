import { config } from 'dotenv';
config();

const SERVICE_URI = process.env.SERVICE_URI;

const infer = async (prompt) => {
    try {
        const response = await fetch(`${SERVICE_URI}/api/infer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({prompt: prompt})
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.inferred;
        }

        else throw Error(`Response not ok: ${JSON.stringify(response)}`);
        
    } catch (err) {
        console.error(`ERROR infer: ${err.message} // ${err.stack}`);
        return null;
    }
}

export default infer;