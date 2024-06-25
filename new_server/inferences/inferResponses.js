import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";

const inferResponses = async (secName, coreGuides, userName, contextGuides, contextEpisodes, contextEntities, secIntent) => {
    const contexts = {
        secName: secName,
        date: Date(),
        coreGuides: coreGuides,
        userName: userName,
        contextGuides: contextGuides,
        contextEpisodes: contextEpisodes,
        contextEntities: contextEntities,
        secIntent: secIntent
    }

    const localPath = 'inference/inferInfos';
    const responsesPrompt = await makePrompt(contexts, localPath);

    return await infer(responsesPrompt);
}

export default inferResponses;