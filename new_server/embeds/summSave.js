import makePrompt from "../functions/makePrompt.js";
import toText from "../functions/toText.js";
import infer from "../inferences/infer.js";
import Episode from "../models/Episode.js";
import embed from "./embed.js";

const summSave = async (user, chats, type) => {
    const contexts = { chatTexts: toText(chats) }
    const localPath = 'embeds/summSave';
    const summPrompt = await makePrompt(contexts, localPath);

    try {
        const summaries = await infer(summPrompt);
        
        const episodes = embed(summaries);

        return Episode.create(episodes);

    } catch (err) {
        console.error(err);
        return null;
    }
}
export default summSave;