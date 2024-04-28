import delay from './chains/delay.js';
import getRecentChats from './chains/getRecentChats.js';
import makeSystemPrompt from './chains/makeSystemPrompt.js';
import makeInference from './retrievers/makeInference.js';
import Secretary from '../models/Secretary.js';
import Chat from '../models/Chat.js';

const makeResponse = async (user) => {
    await delay(3);
    try {
        const secretary = await Secretary.findOne({ _id: user.secretaryID });
        const chats = await Chat.find({ userID: user._id }, {userID: 0, readOnly: 0});
        const recentChats = await getRecentChats(chats);
        const lastChat = recentChats.at(-1);

        const systemPrompt = await makeSystemPrompt(user, secretary, recentChats);
        const userPrompt = lastChat.text;
        const inferredChats = await makeInference(systemPrompt, userPrompt, user);

        const newChats = await Chat.insertMany(inferredChats);
        const scopedNewChats = await Chat.find({ _id: { $in: newChats.map(chat => chat._id) } }).select('-userID -mentionedEntities');

        return scopedNewChats;
    } catch (err) {
        console.log(`Error making response: ${err}`);
    }
}

export default makeResponse;