import inferEps from "../../inferences/inferEps.js";
import epsToText from "../../functions/epsToText.js";
import dataToText from "../../functions/dataToText.js";
import Episode from "../../models/Episode.js";

const startingData = [{
    'role': 'system',
    'content': 'No relevant memory was found.'
}]

const getEpsText = async (userID, chatsSysPrompt, asIntentPrompt) => {
    let epsPrompt = await dataToText(startingData);

    const episodes = await Episode.find({ userID: userID, type: { $in: ['convos', 'dailys'] }});

    const contextEps = await inferEps(chatsSysPrompt, episodes, asIntentPrompt);

    if (contextEps) {
        epsPrompt = await epsToText(contextEps);
    } 

    return epsPrompt;
}

export default getEpsText;