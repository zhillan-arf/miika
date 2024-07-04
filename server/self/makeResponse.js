import Episode from '../models/Episode.js';
import inferAct from '../inferences/inferAct.js';
// import inferEntities from '../inferences/inferEntities.js';
import assistantResponse from '../inferences/assistantResponse.js';
import inferGuides from '../inferences/inferGuides.js';
import inferEpisodes from '../inferences/inferEpisodes.js';
import getRecentEps from '../functions/getRecentEps.js';
import epsToPromptText from '../functions/epsToPromptText.js';
import promptTextToEp from '../functions/promptTextToEp.js'

const makeResponse = async (user, assistant) => {
    try {
        const chats = await Episode.find({ userID: user._id, type:'chat' });
        const tokenCap = 250;
        const fRecentChats = await epsToPromptText(getRecentEps(chats, tokenCap=tokenCap), user.name, assistant.name);
        if (!inferAct(fRecentChats)) return null

        const episodes = await Episode.find(
            { userID: user._id, type: { $in: ['convos', 'dailys'] } }, 
            { userID: 0 }
        );
        
        const guides = await Episode.find({ userID: user._id, type:'guide' });  // mimic

        const contextGuides = await inferGuides(fRecentChats, guides, user.asIntent); // temp debug mimic
        const contextEpisodes = await inferEpisodes(fRecentChats, episodes, user.asIntent); // temp debug mimic
        // const contextEntities = await inferEntities(fRecentChats, contextGuides, contextEpisodes); // mimic

        const responseText = await assistantResponse(
            assistant.name, 
            user.name, 
            assistant.coreGuides,
            contextGuides, 
            contextEpisodes, 
            // contextEntities,
            user.asIntent,
            fRecentChats
        );

        const newEp = promptTextToEp(user._id, 'assistant', responseText);
        await Episode.insertMany(newEp);

        const newChats = responseText.split('ASSISTANT: ')
            .filter(newChat => newChat.trim() != '')
            .map(newChat => {
                return {
                    role: assistant,
                    content: newChat.trim(),
                    date: new Date()
                }
            });
        
        return newChats;

    } catch (err) {
        console.error(`ERROR makeResponse: ${err}`);
        return null;
    }
}

export default makeResponse;