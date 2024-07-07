import Guide from '../../models/Guide.js';
import embed from '../../embedders/embed.js';
import { readFile } from 'fs/promises';
import path from 'path';

const initGuides = async (asID, asName) => {
    const corePath = path.resolve(`prompts/assistants/${asName}/coreGuides.json`);
    const coreBuffer = await readFile(corePath);
    const coreData = JSON.parse(coreBuffer.toString());

    const coreGuides = {
        asID: asID,
        type: 'core',
        data: coreData,
    }

    await Guide.create(coreGuides);

    const contextPath = path.resolve(`prompts/assistants/${asName}/contextGuides.json`);
    const contextBuffer = await readFile(contextPath);
    const contextDatas = JSON.parse(contextBuffer.toString());

    const contextGuides = await Promise.all(contextDatas.map(async (guide) => {
        const newEmbedding = await embed(guide.summary);

        const newGuide = {
            asID: asID,
            type: 'context',
            data: guide.data,
            summary: guide.summary,
            embedding: newEmbedding
        }

        return newGuide;
    }));

    await Guide.insertMany(contextGuides);
}

export default initGuides;