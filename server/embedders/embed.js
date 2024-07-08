import { config } from 'dotenv';
config();

const SERVICE_URI = process.env.SERVICE_URI;

const embed = async (text) => {
    try {
        const response = await fetch(`${SERVICE_URI}/api/embed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: text})
        });

        const data = await response.json();
        
        if (response.ok) {
            const embedding = await data.embedding;
            return embedding;
        }

        else throw Error(`ERROR embed Response not ok: ${JSON.stringify(data)}`);
        
    } catch (err) {
        console.error(`ERROR embed: ${err.stack}`);
        return null;
    }
}

export default embed;