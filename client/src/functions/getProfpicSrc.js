const getProfpicSrc = (type, master, secretary) => {
    if (type === 'master') return `data:image/png;base64,${master.profpic}`;
    else if (type === 'secretary') return `data:image/png;base64,${secretary.profpic}`;
}

export default getProfpicSrc;