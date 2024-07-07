import Assistant from '../../models/Assistant.js';
import Guide from '../../models/Guide.js';
import imgToB64 from '../imgToB64.js';
import initGuides from './initGuides.js';
import { readdir } from 'fs/promises';
import path from 'path';

const saveAsData = async (asName, asPath) => {
    try {
        const profpic = await imgToB64(path.resolve(asPath, 'profpic.jpg'));

        const assistant = new Assistant({
            name: asName,
            gender: 'f',   // temp
            profpic: profpic,
        });
        
        await assistant.save();
        
    } catch (err) {
        console.error(`ERROR initAssistant: ${err.message} // ${err.stack}`);
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
            await saveAsData(asName, asPath);
        }

        const guide = await Guide.findOne({ asID: assistant._id });
        if (!guide) await initGuides(assistant._id, asName);
    }
}

export default initAssistants;