import { config } from 'dotenv';
config();

const SERVICE_URI = process.env.SERVICE_URI;

const embed = async (text) => {
    try {
        console.log(SERVICE_URI);  // debug
        const response = await fetch(`${SERVICE_URI}/api/encode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: text})
        });
        
        if (response.ok) {
            const embedding = await response.json().embedding;
            return embedding;
        }

        else throw Error(`ERROR embed Response not ok: ${JSON.parse(response)}`);
        
    } catch (err) {
        console.error(`ERROR embed: ${err.message} // ${err.stack}`);
        return null;
    }
}

export default embed();