import Assistant from '../models/Assistant.js';
import imgToB64 from './imgToB64.js';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

const saveAsData = async (asName, asPath) => {
    try {
        const profpic = await imgToB64(path.resolve(asPath, 'profpic.jpg'));
        const coreGuidesBuffer = await readFile(path.resolve(asPath, 'coreGuides.txt'));
        const coreGuides = coreGuidesBuffer.toString();

        const assistant = new Assistant({
            name: asName,
            profpic: profpic,
            coreGuides: coreGuides
        });
        
        await assistant.save();
        
    } catch (err) {
        console.error(`get assistant init err: ${err}`);
        throw err;
    }
}

const initAssistants = async () => {
    const assistantsPath = path.resolve('prompts/assistants');
    const asNames = await readdir(assistantsPath);
    
    for (const asName of asNames) {
        const assistant = await Assistant.findOne({name: asName});
        
        if (!assistant) {
            const asPath = path.resolve(assistantsPath, asName);
            saveAsData(asName, asPath);
        }
    }
}

export default initAssistants;