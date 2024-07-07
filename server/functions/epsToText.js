import dataToText from "./dataToText.js";

const epsToText = async (eps) => {
    if (!eps || eps.length === 0) return null;
    
    let textss = '';

    await eps.forEach(ep => {
        const texts = dataToText(ep.data);
        textss += texts;
    });

    return textss.trim();
}

export default epsToText;