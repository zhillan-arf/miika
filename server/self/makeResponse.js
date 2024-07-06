// import inferEntities from '../inferences/inferEntities.js';
import inferAct from '../inferences/inferAct.js';
import assistantResponse from '../inferences/assistantResponse.js';
import inferGuides from '../inferences/inferGuides.js';
import inferEpisodes from '../inferences/inferEpisodes.js';
import getRecentEps from '../functions/getRecentEps.js';
import epsToPromptText from '../functions/epsToPromptText.js';
import formatChats from '../functions/formatChats.js';
import Episode from '../models/Episode.js';

const makeResponse = async (user, assistant) => {
    try {
        const chats = await Episode.find({ userID: user._id, type:'chat' });
        const tokenCap = 250;

        const recentChatsText = await epsToPromptText(
            getRecentEps(chats, tokenCap),
            user.name,
            assistant.name
        );

        const act = await inferAct(recentChatsText);
        if (!act) return null;

        const episodes = await Episode.find(
            { userID: user._id, type: { $in: ['convos', 'dailys'] } }, 
            { userID: 0 }
        );
        
        const guides = await Episode.find({ userID: user._id, type:'guide' });

        const contextGuides = await inferGuides(recentChatsText, guides, user.asIntent);  // debug mimic
        const contextEpisodes = await inferEpisodes(recentChatsText, episodes, user.asIntent); // debug mimic
        // const contextEntities = await inferEntities(recentChatsText, contextGuides, contextEpisodes);

        const responses = await assistantResponse(
            assistant.name, 
            user.name, 
            assistant.coreGuides,
            contextGuides, 
            contextEpisodes, 
            // contextEntities,
            user.asIntent,
            recentChatsText
        );

        console.log(`mR responses: ${JSON.stringify(responses)}`);  // debug

        if (!responses) return null;

        const newEp = {
            userID: user._id,
            type: 'chat',
            date: new Date(),
            data: responses,
            summary: null,
            embedding: null
        }

        await Episode.insertMany(newEp);

        const newChats = await formatChats(responses);
        return newChats;

    } catch (err) {
        return null;
    }
}

export default makeResponse;