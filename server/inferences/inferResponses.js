import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";

const inferResponses = async (asName, coreGuides, userName, contextGuides, contextEpisodes, contextEntities, asIntent) => {
    const contexts = {
        asName: asName,
        date: Date(),
        coreGuides: coreGuides,
        userName: userName,
        contextGuides: contextGuides,
        contextEpisodes: contextEpisodes,
        contextEntities: contextEntities,
        asIntent: asIntent
    }

    const localPath = 'inference/inferInfos';
    const responsesPrompt = await makePrompt(contexts, localPath);

    return await infer(responsesPrompt);
}

export default inferResponses;