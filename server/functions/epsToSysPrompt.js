import dataToTextClean from "./dataToTextClean.js";
import wrapData from "./wrapData.js";

const epsToTextClean = async (eps) => {
    let text = '';

    for (const ep of eps) {
        const newText = await dataToTextClean(ep.data);
        text += newText;
    }

    return text.trim();
}

const epsToSysPrompt = async (eps) => {
    let text = await epsToTextClean(eps);
    text = await wrapData('system', text);
    return text;
}

export default epsToSysPrompt;