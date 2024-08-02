import { readFile } from 'fs/promises';

// Function to read JSON file
const readJSONFile = async (filePath) => {
    const text = await readFile(filePath, 'utf8');
    return await JSON.parse(text);
};

// Function to convert JSON array to formatted text
const jsonToFormattedText = async (contentArray, formats) => {
    return await contentArray.map(item => {
        const format = formats[item.role];
        if (format) {
            return `${format.start}${item.content}${format.end}`;
        }
        return item.content;
    }).join('\n');
};

// // Function to convert formatted text back to JSON array
// const formattedTextToJSON = (text, formats) => {
//     const lines = text.split('\n');
//     const result = [];
//     const formatKeys = Object.keys(formats);

//     lines.forEach(line => {
//         formatKeys.forEach(key => {
//             const format = formats[key];
//             const start = format.start;
//             const end = format.end;

//             if (line.startsWith(start) && line.endsWith(end)) {
//                 result.push({
//                     role: key,
//                     content: line.slice(start.length, -end.length)
//                 });
//             }
//         });
//     });

//     return result;
// };

// Paths to the JSON files
const formatsFilePath = 'formats.json';
const contentFilePath = 'content.json';
const textPath = 'text.json';

// Read formats and content JSON files
const formats = await readJSONFile(formatsFilePath);
const contentArray = await readJSONFile(contentFilePath);

// Convert JSON array to formatted text
const formattedText = await jsonToFormattedText(contentArray, formats);
await console.log('Formatted Text:\n', formattedText);

// // Convert formatted text back to JSON array
// const parsedContentArray = formattedTextToJSON(formattedText, formats);
// console.log('Parsed JSON Array:\n', JSON.stringify(parsedContentArray, null, 2));