import makePrompt from "../functions/makePrompt";
import infer from "./infer";
import Entity from '../models/Entity.js';

const inferEntities = async (recentChats, contextGuides, contextEpisodes) => {
    const contexts = {
        recentChats: recentChats,
        secIntent: secIntent
    }

    const localPath = 'inference/inferEntities';
    const entitiesPrompt = await makePrompt(contexts, localPath);
    
    let contextEntities = '';

    try {
        const entityNames = await JSON.parse(infer(entitiesPrompt));

        for (const entityName in entityNames) {
            const entityDesc = await Entity.find({name: entityName});
            contextEntities += `${entityName}: ${entityDesc}.\n\n`;
        }
        
    } catch (err) {
        console.log(err);
    }

    return contextEntities;
}

export default inferEntities;