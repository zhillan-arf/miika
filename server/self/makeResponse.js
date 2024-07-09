import inferAct from '../inferences/inferAct.js';
import dataToText from '../functions/dataToText.js';
import assistantResponse from '../inferences/assistantResponse.js';
import getCoreText from './response/getCoreText.js';
import getContextText from './response/getContextText.js';
import getEpsText from './response/getEpsText.js';
import saveResponses from './response/saveResponses.js';
import dataToChats from './response/dataToChats.js';
import getRecentEps from '../functions/getRecentEps.js';
import epsToText from '../functions/epsToText.js';
import epsToSysPrompt from '../functions/epsToSysPrompt.js'

const makeResponse = async (user, assistant) => {
    try {
        // Get Data
        const recentEps = await getRecentEps(user._id);
        const chatsPrompt = await epsToText(recentEps);
        const chatsSysPrompt = await epsToSysPrompt(recentEps);

        const answerNow = await inferAct(chatsSysPrompt);
        if (!answerNow) return null;

        const intentPrompt = await dataToText(user.asIntent);

        const corePrompt = await getCoreText(assistant._id);

        const contextPrompt = await getContextText(
            assistant._id, 
            chatsSysPrompt, 
            intentPrompt
        );

        const epsPrompt = await getEpsText(
            user._id, 
            chatsSysPrompt, 
            intentPrompt
        );

        // Get Responses
        const responsesData = await assistantResponse(
            assistant.name, 
            user.name, 
            corePrompt,
            contextPrompt, 
            epsPrompt, 
            intentPrompt,
            chatsPrompt
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