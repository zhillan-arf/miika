import Episode from '../models/Episode.js';
import faiss from '../retrievers/faiss.js';
import rerank from '../retrievers/rerank.js';
import inferAct from '../inferences/inferAct.js';
import inferInfos from '../inferences/inferInfos.js';
import inferEntities from '../inferences/inferEntities.js';
import inferResponses from '../inferences/inferResponses.js';
import getRecentEps from '../functions/getRecentEps.js';

const makeResponse = async (user, secretary) => {
    try {
        const chats = await Episode.find({ userID: user._id, type:'chat' }, {userID: 0});
        const recentChats = await getRecentEps(chats, 500);
        if (!inferAct(recentChats)) return null;

        const episodes = await Episode.find(
            { userID: user._id, type: { $in: ['convos', 'dailys'] } }, 
            { userID: 0 }
        );
        
        const guides = await Episode.find({ userID: user._id, type:'guide' }, {userID: 0});
        
        const hypoInfos = await inferInfos(recentChats, user.secIntent);

        const faissGuides = await faiss(guides, hypoInfos);
        const faissEpisodes = await faiss(episodes, hypoInfos);
        const contextGuides = await rerank(faissGuides, hypoInfos);
        const contextEpisodes = await rerank(faissEpisodes, hypoInfos);

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