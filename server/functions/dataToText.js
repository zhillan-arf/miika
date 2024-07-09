import wrapData from "./wrapData.js";

const dataToText = async (data) => {
    if (!data || data.length === 0) return null;

    let texts = '';

    for (const datum of data) {
        const text = await wrapData(datum.role, datum.content);
        texts += text;
    }

    return texts;
}

export default dataToText;