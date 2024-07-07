import getRecentEps from "../../functions/getRecentEps.js";
import epsToText from "../../functions/epsToText.js";
import Episode from "../../models/Episode.js";

const getRecentsText = async (userID) => {
    const wordsCap = 250;
    const chats = await Episode.find({ userID: userID, type:'chat' });

    const recentEps = getRecentEps(chats, wordsCap);

    const recentChatsText = await epsToText(recentEps);
    
    return recentChatsText;
}

export default getRecentsText;