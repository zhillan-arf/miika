import makePrompt from "../functions/makePrompt";
import infer from "./infer";

const inferResponses = async (secName, userName, contextGuides, contextEpisodes, contextEntities, secIntent) => {
    const contexts = {
        secName: secName,
        date: Date(),
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