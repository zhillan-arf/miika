import { readFile } from 'fs/promises';
import path from 'path';

const getOriIntent = async (asName) => {
    const filePath = path.resolve(`prompts/assistants/${asName}/oriIntent.json`);
    const buffer = await readFile(filePath);
    const oriIntent = JSON.parse(buffer.toString());
    return oriIntent;
} 

export default getOriIntent;