import dataToText from "../../functions/dataToText.js";
import Guide from "../../models/Guide.js";

const getCoreText = async (asID) => {
    const coreGuides = await Guide.find({ asID: asID, type: 'core' });

    const coreGuidesText = await dataToText(coreGuides);
    
    return coreGuidesText;
}

export default getCoreText;