import Episode from '../models/Episode.js';
import inferAct from '../inferences/inferAct.js';
import inferEntities from '../inferences/inferEntities.js';
import inferResponses from '../inferences/inferResponses.js';
import inferGuides from '../inferences/inferGuides.js';
import inferEpisodes from '../inferences/inferEpisodes.js';
import getRecentEps from '../functions/getRecentEps.js';
import epsToText from '../../client/src/functions/epsToText.js';

const makeResponse = async (user, secretary) => {
    try {
        const chats = await Episode.find({ userID: user._id, type:'chat' }, {userID: 0});
        const recentChats = await epsToText(getRecentEps(chats, tokenCap=500), user.name, secretary.name);
        if (!inferAct(recentChats)) return null;

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
            user.name, 
            contextGuides, 
            contextEpisodes, 
            // contextEntities, 
            user.secIntent
        );
        await Episode.insertMany(newChats);

        return newChats;

    } catch (err) {
        console.error(`ERROR makeResponse: ${err}`);
        return null;
    }
}

export default makeResponse;