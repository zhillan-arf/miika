import getFormat from './getFormat.js';

const wrapContent = (content, role) => {
    const { start, end } = getFormat(role);
    if (start) return `${start}${content}${end}\n\n`;
    else throw Error("LLM prompt format unsupported");
}

const epsToPromptText = async (eps) => {
    if (!eps || eps.length === 0) return null;
    
    let recentChatsText = '';

    await eps.forEach(ep => {
        ep.data.forEach(datum => {
            const chat = wrapContent(datum.content, datum.role);
            recentChatsText += chat;
        });
    });

    return recentChatsText.trim();
}

export default epsToPromptText;