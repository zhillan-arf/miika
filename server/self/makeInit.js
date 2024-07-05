import retrieveEpisodes from "../retrievers/retrieveEpisodes.js";
import retrieveGuides from "../retrievers/retrieveGuides.js";
import inferThoughts from "../inferences/inferThoughts.js";
import inferNewIntent from "../inferences/inferNewIntent.js";
import inferInitChats from "../inferences/inferInitChats.js";
import Episode from "../models/Episode.js";
import User from '../models/User.js'
import getRecentEps from "../functions/getRecentEps.js";

const initiate = async (user) => {
    try {
        const dailys = await Episode.find({ userID: user._id, type:'daily' });
        const monologues = await Episode.find({ userID: user._id, type:'monologue' });
        const chats = await Episode.find({ userID: user._id, type:'chat' });
        const guides = await Episode.find({ userID: user._id, type:'guide' });

        const recentDailys = getRecentEps(dailys, 100);
        const recentMonologues = getRecentEps(monologues, 100);
        const recentChats = getRecentEps(chats, 100);
        
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
        console.error(`ERROR initiate: ${err.message} // ${err.stack}`);
    }
}

export default initiate;