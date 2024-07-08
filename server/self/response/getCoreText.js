import epsToText from "../../functions/epsToText.js";
import Guide from "../../models/Guide.js";

const getCoreText = async (asID) => {
    const coreGuides = await Guide.find({ asID: asID, type: 'core' });

    const coreGuidesText = await epsToText(coreGuides);
    
    return coreGuidesText;
}

export default getCoreText;