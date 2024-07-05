import { readFile } from 'fs/promises';
import path from 'path';

const FORMATNAME = 'ChatML';

const filePath = path.resolve('functions/formats.json');
const buffer = await readFile(filePath);
const formats = JSON.parse(buffer);

const wrapData = (data, role) => {
    if (formats[FORMATNAME]) {
        const { start, end } = formats[FORMATNAME][role];

        return `${start}${data.content}${end}\n\n`;

    } else throw Error("LLM prompt format unsupported");
}

const epsToPromptText = (eps) => {
    if (!eps || eps.length === 0) return null;
    
    let recentChatsText = '';

    eps.forEach(ep => {
        ep.data.forEach(datum => {
            const chat = wrapData(datum.content, datum.role);
            recentChatsText += chat;
        });
    })

    console.debug(`epsToPrompt recentChatsText: ${recentChatsText}`);  // debug

    return recentChatsText.trim();
}

export default epsToPromptText;