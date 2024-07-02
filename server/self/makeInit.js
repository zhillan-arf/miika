import retrieveEpisodes from "../retrievers/retrieveEpisodes.js";
import retrieveGuides from "../retrievers/retrieveGuides.js";
import inferThoughts from "../inferences/inferThoughts.js";
import inferNewIntent from "../inferences/inferNewIntent.js";
import inferInitChats from "../inferences/inferInitChats.js";
import Episode from "../models/Episode.js";
import User from '../models/User.js'

const initiate = async (user) => {
    try {
        const dailys = await Episode.find({ userID: user._id, type:'daily' }, {userID: 0});
        const monologues = await Episode.find({ userID: user._id, type:'monologue' }, {userID: 0});
        const chats = await Episode.find({ userID: user._id, type:'chat' }, {userID: 0});
        const guides = await Episode.find({ userID: user._id, type:'guide' }, {userID: 0});

        const recentDailys = getRecentEps(dailys, 250);
        const recentMonologues = getRecentEps(monologues, 300);
        const recentChats = getRecentEps(chats, 250);

        const hypoThoughts = inferThoughts(recentDailys, recentMonologues, recentChats, user.asIntent);
        
        const episodes = await Episode.find(
            { userID: user._id, type: { $in: ['convos', 'dailys', 'monologues'] } }, 
            { userID: 0 }
        );
        
        const contextGuides = await retrieveGuides(guides, user.asIntent, hypoThoughts);
        const contextEpisodes = await retrieveEpisodes(episodes, user.asIntent, hypoThoughts);

        const [contextMonologues, newMonologues] = await inferNewMonologues(contextGuides, contextEpisodes, recentMonologues);
        const newIntent = await inferNewIntent(contextMonologues, user.asIntent);
        const newChats = await inferInitChats(contextMonologues);

        await User.findOneAndUpdate(
            { _id: user._id },
            { $set: { asIntent: newIntent } }
        )

        await Episode.create(newMonologues);

        return newChats;

    } catch (err) {
        console.error(`ERROR initiate: ${err}`);
    }
}

export default initiate;