import Episode from '../models/Episode.js';
import retrieveGuides from '../retrievers/retrieveGuides.js';
import retrieveEpisodes from '../retrievers/retrieveEpisodes.js';
import inferInfos from '../inferences/inferInfos.js';
import inferEntities from '../inferences/inferEntities.js';
import inferResponses from '../inferences/inferResponses.js';

const getRecentChats = (chats) => {
    const tokenCap = 500;
    let i = chats.length - 1;
    let tokensLength = 0;
    
    for (i; i >= 0; i--) {
        const tokenLength = chats[i].text.split(' ').length;
        if (tokensLength + tokenLength >= tokenCap) break;
        tokensLength += tokenLength;
    }

    return chats.slice(i + 1, chats.length);
}

const makeResponse = async (user, secretary) => {
    try {
        const chats = await Episode.find({ userID: user._id, type:'chat' }, {userID: 0});
        const recentChats = await getRecentChats(chats);
        const episodes = await Episode.find({ userID: user._id, type:'episode' }, {userID: 0});
        const guides = await Episode.find({ userID: user._id, type:'guide' }, {userID: 0});
        
        const hypoInfos = await inferInfos(recentChats, user.secIntent);
        const contextGuides = await retrieveGuides(guides, hypoInfos);
        const contextEpisodes = await retrieveEpisodes(episodes, hypoInfos);
        const contextEntities = await inferEntities(recentChats, contextGuides, contextEpisodes);

        const newChats = await inferResponses(secretary.name, user.name, contextGuides, contextEpisodes, contextEntities, secIntent);
        await Episode.insertMany(newChats);

        return newChats;

    } catch (err) {
        console.log(`ERROR makeResponse: ${err}`);
    }
}

export default makeResponse;