import Episode from '../models/Episode.js';
import Secretary from '../models/Secretary.js';
import retrieveGuides from '../retrievers/retrieveGuides.js';
import retrieveEpisodes from '../retrievers/retrieveEpisodes.js';
import inferAct from '../inferences/inferAct.js';
import inferInfos from '../inferences/inferInfos.js';
import inferEntities from '../inferences/inferEntities.js';
import inferResponses from '../inferences/inferResponses.js';
import getRecentEps from '../functions/getRecentEps.js';

const makeResponse = async (user) => {
    try {
        const secretary = await Secretary.findOne({_id: user.secretaryID});
        const chats = await Episode.find({ userID: user._id, type:'chat' }, {userID: 0});
        const recentChats = await getRecentEps(chats, 500);

        if (!inferAct(recentChats)) {
            return null;
        }

        const episodes = await Episode.find(
            { userID: user._id, type: { $in: ['convos', 'dailys'] } }, 
            { userID: 0 }
        );

        const guides = await Episode.find({ userID: user._id, type:'guide' }, {userID: 0});
        
        const hypoInfos = await inferInfos(recentChats, user.secIntent);
        const contextGuides = await retrieveGuides(guides, user.secIntent, hypoInfos);
        const contextEpisodes = await retrieveEpisodes(episodes, user.secIntent, hypoInfos);
        const contextEntities = await inferEntities(recentChats, contextGuides, contextEpisodes);

        const newChats = await inferResponses(
            secretary.name, 
            user.name, 
            contextGuides, 
            contextEpisodes, 
            contextEntities, 
            secIntent
        );
        await Episode.insertMany(newChats);

        return newChats;

    } catch (err) {
        console.log(`ERROR makeResponse: ${err}`);
    }
}

export default makeResponse;