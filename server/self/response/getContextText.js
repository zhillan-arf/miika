import inferGuides from "../../inferences/inferGuides.js";
import epsToText from "../../functions/epsToText.js";
import dataToText from "../../functions/dataToText.js";
import Guide from "../../models/Guide.js";

const startingData = [{
    'role': 'system',
    'content': 'No relevant memory was found.'
}]

const getContextText = async (asID, chatsSysPrompt, intentPrompt) => {
    let contextPrompt = await dataToText(startingData);

    const guides = await Guide.find({ asID: asID, type: 'context' });
    
    const contextGuides = await inferGuides(chatsSysPrompt, guides, intentPrompt);

    if (contextGuides) {
        contextPrompt = await epsToText(contextGuides);
    }

    return contextPrompt;
}

export default getContextText;