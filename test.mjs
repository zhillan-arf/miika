import { readFile } from 'fs/promises';
import getOriIntent from './server/functions/getOriIntent.js';
import path from 'path';

const assistantName = 'mist';

const readText = async () => {
    const testFilePath = path.resolve(`server/prompts/assistants/${assistantName}/oriIntent.txt`);
    const text = await readFile(testFilePath);
    console.log(typeof text.toString())
    console.log(text);
}

readText();

// const testGetOriIntent = async () => {
//     try {
//         const result = await getOriIntent(assistantName);
//         console.log('File Content:\n\n', result.toString());
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// };

// testGetOriIntent();