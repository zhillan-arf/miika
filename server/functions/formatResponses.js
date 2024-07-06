import getFormat from "./getFormat.js";

const userFormat = getFormat('user');
const asFormat = getFormat('assistant');

const fixText = (text) => {
    const startIdx = text.indexOf(userFormat.start);
    if (startIdx !== -1) text = text.substring(0, startIdx);

    const endIdx = text.lastIndexOf(userFormat.end);
    if (endIdx !== -1 && userFormat.end.trim() !== '') {
        text = text.substring(0, endIdx + userFormat.end.length);
    }

    const fixedText = `${asFormat.start}${text.trim()}`;
    return fixedText;
}

const splitResponses = (text) => {
    let responses = text.split(asFormat.start)
        .filter(text => text.trim() !== '');

    responses = responses.map(response => {
        let data = {
            role: 'assistant',
            content: response.trim()
        }

        if (asFormat.end.trim() !== '') {
            const endIdx = data.content.indexOf(asFormat.end);

            if (endIdx !== -1) {
                data.content = data.content.substring(0, endIdx);
            }
        }

        return data;
    });
    
    return responses;
}

const formatResponses = (text) => {
    const fixedText = fixText(text);
    const responses = splitResponses(fixedText);
    return responses;
}

export default formatResponses;