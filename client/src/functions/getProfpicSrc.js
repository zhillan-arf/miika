const getProfpicSrc = (type, user, assistant) => {
    if (type === 'user') return `data:image/png;base64,${master.profpic}`;
    else if (type === 'assistant') return `data:image/png;base64,${assistant.profpic}`;
}

export default getProfpicSrc;