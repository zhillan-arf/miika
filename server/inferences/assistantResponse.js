import makePrompt from "../functions/makePrompt.js";
import getFormatDate from "../functions/getFormatDate.js";
import infer from "./infer.js";

const assistantResponse = async (asName, coreGuides, userName, contextGuides, contextEpisodes, contextEntities, asIntent) => {
    const contexts = {
        asName: asName,
        userName: userName,
        coreGuides: coreGuides,
        contextGuides: contextGuides,
        contextEpisodes: contextEpisodes,
        contextEntities: contextEntities,
        asIntent: asIntent,
        date: getFormatDate(),
    }

    const localPath = 'assistants/mist';
    const responsesPrompt = await makePrompt(contexts, localPath);

    return await infer(responsesPrompt);
}

export default assistantResponse;