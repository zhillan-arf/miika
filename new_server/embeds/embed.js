const SERVICE_URI = process.env.SERVICE_URI;

const embed = async (text) => {
    const response = await fetch(`${SERVICE_URI}/api/embed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
    });

    const data = await response.json();
    
    return data.embedding;
}

export default embed;