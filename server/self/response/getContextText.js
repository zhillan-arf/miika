import inferGuides from "../../inferences/inferGuides.js";
import epsToText from "../../functions/epsToText.js";
import Guide from "../../models/Guide.js";

const getContextText = async (asID, recentChatsText, asIntentText) => {
    const guides = await Guide.find({ asID: asID, type: 'context' });
    
    const contextGuides = await inferGuides(recentChatsText, guides, asIntentText);

    const contextGuidesText = await epsToText(contextGuides);
    
    return contextGuidesText;
}

export default getContextText;