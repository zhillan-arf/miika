import makePrompt from "../functions/makePrompt.js";
import getFormatDate from "../functions/getFormatDate.js";
import infer from "./infer.js";

const assistantResponse = async (asName, userName, coreGuides, contextGuides, contextEpisodes, asIntent, recentChats) => {
    const contexts = {
        coreGuides: coreGuides,
        contextGuides: contextGuides,
        contextEpisodes: contextEpisodes,
        // contextEntities: contextEntities,
        asIntent: asIntent,
        date: getFormatDate(),
        recentChats: recentChats,
        asName: asName,
        userName: userName,
    }

    const localPath = 'assistants/mist/assistantResponse';
    const responsesPrompt = await makePrompt(contexts, localPath);

    return await infer(responsesPrompt);
}

export default assistantResponse;