import inferEps from "../../inferences/inferEps.js";
import epsToText from "../../functions/epsToText.js";
import dataToText from "../../functions/dataToText.js";
import Episode from "../../models/Episode.js";

const startingData = {
    'role': 'system',
    'content': 'No relevant memory was found.'
}

const getEpsText = async (userID, recentChatsText, asIntentText) => {
    let contextEpisodesText = '';

    const episodes = await Episode.find({ userID: userID, type: { $in: ['convos', 'dailys'] }});

    const contextEpisodes = await inferEps(recentChatsText, episodes, asIntentText);

    if (contextEpisodes) {
        contextEpisodesText = await epsToText(contextEpisodes);
    } else {
        contextEpisodesText = await dataToText(startingData);
    }
    
    return contextEpisodesText;
}

export default getEpsText;