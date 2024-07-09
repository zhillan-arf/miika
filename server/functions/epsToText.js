import dataToText from "./dataToText.js";

const epsToText = async (eps) => {
    if (!eps || eps.length === 0) return null;
    
    let textss = '';

    for (const ep of eps) {
        const texts = await dataToText(ep.data);
        textss += texts;
    }

    return textss.trim();
}

export default epsToText;