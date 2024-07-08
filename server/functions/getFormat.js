import { readFile } from 'fs/promises';
import { config } from 'dotenv';
import path from 'path';
config();

const FORMATNAME = process.env.FORMATNAME;

const filePath = path.resolve('prompts/toTextFormats.json');
const buffer = await readFile(filePath);
const formats = JSON.parse(buffer.toString());

const getFormat = (role) => {
    const start = formats[FORMATNAME][role].start;
    const end = formats[FORMATNAME][role].end;
    return { start: start, end: end };
}

export default getFormat;