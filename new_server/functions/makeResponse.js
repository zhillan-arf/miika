import Episode from '../models/Episode.js';
import retrieveGuides from '../retrievers/retrieveGuides.js';
import retrieveEps from '../retrievers/retrieveEps.js';
import inferInfos from '../inferences/inferInfos.js';
import inferEntities from '../inferences/inferEntities.js';
import inferResponses from '../inferences/inferResponses.js';

const getRecentChats = (chats) => {
    return 'lorem ipusm';
}

const makeMainPrompt = (secretary, user, contextGuides, entitiesDesc, intent) => {
    return 'lorem ipsum';
}

const makeResponse = async (user, secretary) => {
    try {
        const chats = await Episode.find({ userID: user._id, type:'chat' }, {userID: 0});
        const episodes = await Episode.find({ userID: user._id, type:'episode' }, {userID: 0});
        const guides = await Episode.find({ userID: user._id, type:'guide' }, {userID: 0});
        const intent = user.intent;

        const recentChats = await getRecentChats(chats);
        const hypoInfos = await inferInfos(recentChats, intent);
        const contextGuides = await retrieveGuides(guides, hypoInfos);
        const contextEpisodes = await retrieveEps(episodes, hypoInfos);
        const entitiesDesc = await inferEntities(recentChats, contextGuides, contextEpisodes);

        const mainPrompt = await makeMainPrompt(secretary, user, contextGuides, entitiesDesc, intent);

        const newChats = await inferResponses(mainPrompt);
        await Episode.insertMany(newChats);

        return newChats;

    } catch (err) {
        console.log(`Error making response: ${err}`);
    }
}

export default makeResponse;