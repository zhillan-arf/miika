const SERVICE_URI = process.env.SERVICE_URI;

const embed = async (texts) => {
    const response = await fetch(`${SERVICE_URI}/api/embed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: texts })
    });

    const pairs = (await response.json()).pairs;

    const episodes = pairs.map((pair) => ({
        userID: user._id,
        type: type,
        date: Date(),
        text: pair.text,
        lastRetrieved: Date(),
        timesRetrieved: 1,
        embedding: pair.embedding
    }));

    return episodes;
}

export default embed;