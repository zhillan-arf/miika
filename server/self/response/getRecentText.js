import getRecentEps from "../../functions/getRecentEps.js";
import epsToText from "../../functions/epsToText.js";

const getRecentsText = async (userID) => {
    const recentEps = await getRecentEps(userID);

    const recentChatsText = await epsToText(recentEps);

    return recentChatsText;
}

export default getRecentsText;