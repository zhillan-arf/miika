import Episode from '../models/Episode.js';
import inferAct from '../inferences/inferAct.js';
// import inferEntities from '../inferences/inferEntities.js';
import inferResponses from '../inferences/inferResponses.js';
import inferGuides from '../inferences/inferGuides.js';
import inferEpisodes from '../inferences/inferEpisodes.js';
import getRecentEps from '../functions/getRecentEps.js';
import epsToPromptText from '../functions/epsToPromptText.js';

const makeResponse = async (user, secretary) => {
    try {
        const chats = await Episode.find({ userID: user._id, type:'chat' }, {userID: 0});
        const recentChats = await epsToPromptText(getRecentEps(chats, tokenCap=250), user.name, secretary.name);
        if (!inferAct(recentChats)) return null

        const episodes = await Episode.find(
            { userID: user._id, type: { $in: ['convos', 'dailys'] } }, 
            { userID: 0 }
        );
        
        const guides = await Episode.find({ userID: user._id, type:'guide' }, {userID: 0});

        const contextGuides = await inferGuides(recentChats, guides, user.secIntent); 
        const contextEpisodes = await inferEpisodes(recentChats, episodes, user.secIntent); 
        // const contextEntities = await inferEntities(recentChats, contextGuides, contextEpisodes); 

        const newChats = await inferResponses(
            secretary.name, 
            secretary.coreGuides,
            user.name, 
            user.secIntent,
            contextGuides, 
            contextEpisodes, 
            // contextEntities, 
            recentChats
        );

        const newEp = promptTextToEp(newChats)
        await Episode.insertMany(newEp);
        return newEp;

    } catch (err) {
        console.error(`ERROR makeResponse: ${err}`);
        return null;
    }
}

export default makeResponse;