import makePrompt from "../functions/makePrompt.js";
import getFormatDate from "../functions/getFormatDate.js";
import textToData from "../functions/textToData.js";
import infer from "./infer.js";

const assistantResponse = async (asName, userName, coreGuides, contextGuides, contextEpisodes, asIntent, recentChats) => {
    const contexts = {
        coreGuides: coreGuides,
        contextGuides: contextGuides,
        contextEpisodes: contextEpisodes,
        asIntent: asIntent,
        date: getFormatDate(),
        recentChats: recentChats,
        asName: asName,
        userName: userName,
    }

    const promptPath = path.resolve('prompts/inferences/inferGuides.json');
    const responsePrompt = await makePrompt(contexts, promptPath);

    const responseText = await infer(responsePrompt);
    const responses = await textToData(responseText);  // arr of str

    return responses;
}

export default assistantResponse;