import { readFile } from 'fs/promises';
import path from 'path';

const filePath = path.resolve('functions/formats.json');
const buffer = await readFile(filePath);
const formats = JSON.parse(buffer);

const FORMATNAME = 'ChatML';

const getFormat = (role) => {
    const { start, end } = formats[FORMATNAME][role];
    return { start: start, end: end };
}

export default getFormat;