import { readFile } from 'fs/promises';

// Function to read JSON file
const readJSONFile = async (filePath) => {
    const text = await readFile(filePath, 'utf8');
    return await JSON.parse(text);
};

// Function to read text file
const readTxtFile = async (filePath) => {
    const text = await readFile(filePath, 'utf8');
    return text;
};

// // Function to convert JSON array to formatted text
// const jsonToFormattedText = async (contentArray, formats) => {
//     return await contentArray.map(item => {
//         const format = formats[item.role];
//         if (format) {
//             return `${format.start}${item.content}${format.end}`;
//         }
//         return item.content;
//     }).join('\n');
// };

// // Convert text to JSON array
const formattedTextToJSON = async (input, format) => {
    const roles = Object.keys(format);
    const regex = new RegExp(roles.map(role => {
        return `${format[role].start}(.*?)${format[role].end}`;
    }).join('|'), 'g');
  
    let result = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
      for (let i = 1; i < match.length; i++) {
        if (match[i] !== undefined) {
          result.push({
            role: roles[i - 1],
            content: match[i].trim()
          });
        }
      }
    }
  
    return result;

    return result;
};

// Paths to the JSON files
const formatsFilePath = 'formats.json';
const contentFilePath = 'text.txt';

// Read formats and content JSON files
const formats = await readJSONFile(formatsFilePath);
const text = await readTxtFile(contentFilePath);

// Convert formatted text to JSON array
const parsedContentArray = await formattedTextToJSON(text, formats);
await console.log('Parsed JSON Array:\n', JSON.stringify(parsedContentArray, null, 2));