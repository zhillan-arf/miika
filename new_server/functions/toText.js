const toText = (episodes) => {
    let text = '';

    for (const episode in episodes) {
        text += `${episode.role.toUpperCase()}: ${episode.text}\n\n`;
    }

    return text;
}

export default toText;