const guidesToText = (guides, userName) => {
    if (!guides || guides.length === 0) return null

    const texts = guides.map(guide => guide.txt).join('\n\n');

    return texts.trim();
}

export default epsToText;