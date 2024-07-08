import getFormat from './getFormat.js';

const wrapData = (role, content) => {
    const format = getFormat(role);

    if (format.start || format.start === '') {
        return `${format.start}${content}${format.end}\n\n`;
    }

    else throw Error("LLM prompt format unsupported");
}

const dataToText = async (data) => {
    if (!data || data.length === 0) return null;

    let texts = '';

    await data.forEach(datum => {
        const text = wrapData(datum.role, datum.content);
        texts += text;
    })

    return texts;
}

export default dataToText;