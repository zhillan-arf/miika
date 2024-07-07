import inferAct from '../inferences/inferAct.js';
import dataToText from '../functions/dataToText.js';
import assistantResponse from '../inferences/assistantResponse.js';
import getRecentsText from './response/getRecentText.js';
import getCoreText from './response/getCoreText.js';
import getContextText from './response/getContextText.js';
import getEpsText from './response/getEpsText.js';
import saveResponses from './response/saveResponses.js';
import formatChats from './response/dataToChats.js';
import dataToChats from './response/dataToChats.js';

const makeResponse = async (user, assistant) => {
    try {
        // Get Data
        const recentChatsText = await getRecentsText(user._id);

        const answerNow = await inferAct(recentChatsText);
        if (!answerNow) return null;

        const asIntentText = await dataToText(user.asIntent);

        const coreGuidesText = getCoreText(assistant._id);

        const contextGuidesText = getContextText(
            assistant._id, 
            recentChatsText, 
            asIntentText
        );

        const contextEpisodesText = getEpsText(
            user._id, 
            recentChatsText, 
            asIntentText
        );

        // Get Responses
        const responsesData = await assistantResponse(
            assistant.name, 
            user.name, 
            coreGuidesText,
            contextGuidesText, 
            contextEpisodesText, 
            asIntentText,
            recentChatsText
        );

        if (!responsesData || responsesData.length == 0) return null;

        // Handle Response
        await saveResponses(user._id, responsesData);

        const newChats = await dataToChats(responsesData);
        return newChats;        

    } catch (err) {
        console.error(`ERROR makeResponse: ${err.stack}`);
        return null;
    }
}

export default makeResponse;