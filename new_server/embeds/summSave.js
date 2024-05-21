import makePrompt from "../functions/makePrompt";
import toText from "../functions/toText";
import infer from "../inferences/infer";
import Episode from "../models/Episode";
import embed from "./embed";

const summSave = async (user, chats, type) => {
    const contexts = { chatTexts: toText(chats) }
    const localPath = 'embeds/summSave';
    const summPrompt = await makePrompt(contexts, localPath);

    try {
        const summaries = (await infer(summPrompt)).summaries;
        
        const pairs = (await embed(summaries)).pairs;

        const episodes = pairs.map((pair) => ({
            userID: user._id,
            type: type,
            date: Date(),
            text: pair.text,
            lastRetrieved: Date(),
            timesRetrieved: 1,
            embedding: pair.embedding
        }));

        return Episode.create(episodes);

    } catch (err) {
        console.log(err);
    }
}
export default summSave;