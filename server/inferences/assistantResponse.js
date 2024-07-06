import makePrompt from "../functions/makePrompt.js";
import getFormatDate from "../functions/getFormatDate.js";
import formatResponses from "../functions/formatResponses.js";
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
    const responsePrompt = await makePrompt(contexts, localPath);

    const responseText = await infer(responsePrompt);
    const responses = await formatResponses(responseText);  // arr of str

    return responses;
}

export default assistantResponse;