import Secretary from '../models/Secretary.js';
import imgToB64 from './imgToB64.js';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

const sAspects = ['chatExamples.txt', 'config.txt', 'gender.txt', 'lore.txt', 'profpic.jpg', 'protocol.txt']

const initSecretary = async (secretaryName, secretaryPath) => {
    try {
        const secretary = new Secretary({
            name: secretaryName,
            gender: await readFile(path.resolve(secretaryPath, 'gender.txt')) == 'm',
            profpic: await imgToB64(path.resolve(secretaryPath, 'profpic.jpg')),
            lore: await readFile(path.resolve(secretaryPath, 'lore.txt')),
            chatExamples: await readFile(path.resolve(secretaryPath, 'chatExamples.txt')),
            protocol: await readFile(path.resolve(secretaryPath, 'protocol.txt'))
        });
        
        await secretary.save();
    } catch (err) {
        console.log(`get secretary init err: ${err}`);
    }
}

const initSecretaries = async () => {
    const secretariesPath = path.resolve('prompts/secretaries');
    const secretaryNames = await readdir(secretariesPath);
    for (const secretaryName of secretaryNames) {
        const secretary = await Secretary.findOne({name: secretaryName});
        if (!secretary) {
            const secretaryPath = path.resolve(secretariesPath, secretaryName);
            const aspects = await readdir(secretaryPath);
            if (JSON.stringify(sAspects.sort()) === JSON.stringify(aspects.sort())) {
                initSecretary(secretaryName, secretaryPath);
            } else throw Error(`Missing files at ${secretaryName}`);
        }
    }
}

export default initSecretaries;