import Secretary from '../models/Secretary.js';
import imgToB64 from './imgToB64.js';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

const saveSecData = async (secName, secPath) => {
    try {
        const secretary = new Secretary({
            name: secName,
            gender: await readFile(path.resolve(secPath, 'gender.txt')) == 'm',
            profpic: await imgToB64(path.resolve(secPath, 'profpic.jpg')),
        });
        
        await secretary.save();
        
    } catch (err) {
        console.log(`get secretary init err: ${err}`);
    }
}

const initSecretaries = async () => {
    const secsPath = path.resolve('prompts/secretaries');
    const secNames = await readdir(secsPath);
    
    for (const secName of secNames) {
        const secretary = await Secretary.findOne({name: secName});
        
        if (!secretary) {
            const secPath = path.resolve(secsPath, secName);
            saveSecData(secName, secPath);
        }
    }
}

export default initSecretaries;