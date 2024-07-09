const dataToTextClean = async (data) => {
    let text = '';

    for (const datum of data) {
        text += datum.content;
    }

    return text;
}

export default dataToTextClean;