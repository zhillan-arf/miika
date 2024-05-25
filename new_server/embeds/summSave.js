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
        const summaries = await infer(summPrompt);
        
        const episodes = embed(summaries);

        return Episode.create(episodes);

    } catch (err) {
        console.log(err);
    }
}
export default summSave;