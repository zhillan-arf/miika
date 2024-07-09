import getFormat from './getFormat.js';

const wrapData = async (role, content) => {
    const format = getFormat(role);

    if (format.start || format.start === '') {
        return `${format.start}${content}${format.end}\n\n`;
    }

    else throw Error("LLM prompt format unsupported");
}

export default wrapData;