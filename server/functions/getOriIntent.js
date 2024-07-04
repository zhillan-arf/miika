import { readFile } from 'fs/promises';
import path from 'path';

const getOriIntent = async (asName) => {
    const filePath = path.resolve(`prompts/assistants/${asName}/oriIntent.txt`);
    const buffer = await readFile(filePath);
    return buffer.toString();;
} 

export default getOriIntent;