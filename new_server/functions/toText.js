const toText = (episodes) => {
    let text = '';

    for (const episode in episodes) {
        if (episode.role) text += `${episode.role.toUpperCase()}: `;
        text += `${episode.text}\n\n`;
    }

    return text;
}

export default toText;