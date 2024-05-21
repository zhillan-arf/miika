const SERVICE_URI = process.env.SERVICE_URI;

const embed = async (texts) => {
    const response = await fetch(`${SERVICE_URI}/api/embed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: texts })
    });

    return await response.json();
}

export default embed;