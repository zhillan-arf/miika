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
        const chats = await Episode.find({ userID: user._id, type:'chat' }, {userID: 0});
        const recentChats = await epsToPromptText(getRecentEps(chats, tokenCap=250), user.name, assistant.name);
        if (!inferAct(recentChats)) return null

        const episodes = await Episode.find(
            { userID: user._id, type: { $in: ['convos', 'dailys'] } }, 
            { userID: 0 }
        );
        
        const guides = await Episode.find({ userID: user._id, type:'guide' }, {userID: 0});

        const contextGuides = await inferGuides(recentChats, guides, user.asIntent); 
        const contextEpisodes = await inferEpisodes(recentChats, episodes, user.asIntent); 
        // const contextEntities = await inferEntities(recentChats, contextGuides, contextEpisodes); 

        const responseText = await assistantResponse(
            assistant.name, 
            assistant.coreGuides,
            assistant.name, 
            user.asIntent,
            contextGuides, 
            contextEpisodes, 
            // contextEntities, 
            recentChats
        );

        const newEp = promptTextToEp(user._id, 'assistant', responseText)
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