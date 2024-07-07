import Episode from "../../models/Episode.js";

const saveResponses = async (userID, responses) => {
    const newEp = {
        userID: userID,
        type: 'chat',
        date: new Date(),
        data: responses,
        summary: null,
        embedding: null
    }

    await Episode.insertMany(newEp);
}

export default saveResponses;