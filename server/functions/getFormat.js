import { readFile } from 'fs/promises';
import { config } from 'dotenv';
import path from 'path';
config();

const FORMATNAME = process.env.FORMATNAME;

const filePath = path.resolve('prompts/toTextFormats.json');
let formats;

const initializeFormats = async () => {
    const buffer = await readFile(filePath);
    formats = JSON.parse(buffer.toString());
};

await initializeFormats();

const getFormat = (role) => {
    if (!formats) {
        throw new Error('getFormat: Formats have not been initialized');
    }
    const start = formats[FORMATNAME][role].start;
    const end = formats[FORMATNAME][role].end;
    return { start: start, end: end };
}

export default getFormat;