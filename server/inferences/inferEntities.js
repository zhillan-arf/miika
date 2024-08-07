import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";
import Entity from '../models/Entity.js';

const inferEntities = async (recentChats, contextGuides, contextEpisodes) => {
    const contexts = {
        recentChats: recentChats,
        asIntent: asIntent
    }
    const localPath = 'inferences/inferEntities';
    const entitiesPrompt = await makePrompt(contexts, localPath);
    
    let contextEntities = '';
    try {
        const entityNames = await infer(entitiesPrompt);

        for (const entityName in entityNames) {
            const entityDesc = await Entity.find({name: entityName});
            contextEntities += `${entityName}: ${entityDesc}.\n\n`;
        }
        
    } catch (err) {
        console.error(err);
    }

    return contextEntities;
}

export default inferEntities;