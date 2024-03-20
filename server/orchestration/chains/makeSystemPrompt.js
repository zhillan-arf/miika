import Secretary from '../../models/secretary.js';

const getSecretary = async (user) => {
    try {
        const secretary = await Secretary.findOne({ _id: user.secretaryID });
        return secretary;
    } catch (err) {
        console.log("Error at retrieving database");
    }
}

const makeSystemPrompt = (user) => {
    const secretary = getSecretary(user);
}

export default makeSystemPrompt;