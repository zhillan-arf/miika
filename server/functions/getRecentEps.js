import Episode from "../models/Episode.js";

const getRecentEps = async (userID) => {
    const wordsCap = 250;
    const eps = await Episode.find({ userID: userID, type:'chat' });

    if (!eps || eps.length === 0) return null;

    let i = eps.length - 1;
    let wordsLength = 0;
    
    for (i; i >= 0; i--) {
        let dataLength = 0;

        eps[i].data.forEach(datum => {
            dataLength += datum.content.split(/\s+/).filter(Boolean).length;
        });

        if (wordsLength + dataLength >= wordsCap) break;
        wordsLength += dataLength;
    }

    const recentEps = eps.slice(i + 1, eps.length);
    return recentEps;
}

export default getRecentEps;