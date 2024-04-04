import Secretary from '../models/Secretary.js';
import Chat from '../models/Chat.js';
import { readFileSync } from 'fs';

const MICROSERVICE_URI = process.env.MICROSERVICE_URI;  // temp
let lastChat = null;

const delay = (duration) => {
    return new Promise(resolve => setTimeout(resolve, duration));
}

// System
const getRecentChats = (chats) => {
    const tokenCap = 2000;
    let i = chats.length - 1;
    let currentLength = 0;
    
    for (i; i >= 0; i--) {
        textLength = chats[i].text.length;
        if (currentLength + textLength >= tokenCap) break;
        currentLength += textLength;
    }

    const recentChats = chats.slice(i, chats.length - 1);
    lastChat = chats[chats.length - 1];
    return recentChats;
}

const formatRecentChats = (recentChats, userName, secretaryName) => {
    let formattedRecentChats = '';

    recentChats.forEach(chat => {
        let name = userName;
        if (chat.role === 'secretary') name == secretaryName;
        if (chat.role === 'shadow') name == `Shadow ${name}`;
        formattedRecentChats += `${name}:\n${chat.text}\n\n`;
    });

    return formattedRecentChats.trim();
}

const getRelevantMemories = (recentChats) => {
    return `This is the first time they're interacting.`;  //temp
}

const getRecentSummary = (chats) => {
    return `various things`;  //temp
}

const fillSystemTemplate = (systemTemplate, variables) => {
    Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        systemTemplate = systemTemplate.replace(regex, variables[key]);
    });
    return systemTemplate;
}

const makeSystemPrompt = async (user) => {
    try {
        const secretary = await Secretary.findOne({ _id: user.secretaryID });
        const chats = await Chat.find({ _id: user._id }, {userID: 0, readOnly: 0});
        const filePath = '../prompts/main/system.txt';
        const systemTemplate = readFileSync(filePath,  'utf8');
        const recentChats = getRecentChats(chats);  // except last chat
        const variables = {
            secretaryName: secretary.name,
            userName: user.name,
            pronoun1: (secretary.gender === 'm') ? 'he' : 'she',
            pronoun3: (secretary.gender === 'm') ? 'him' : 'her',
            secretaryProtocol: secretary.protocol,
            formattedRecentChats: formatRecentChats(recentChats),
            relevantMemories: getRelevantMemories(recentChats),
            recentSummary: getRecentSummary(chats)
        }
        return fillSystemTemplate(systemTemplate, variables);
    } catch (err) {
        return "Error: database failure";
    }
}

// Assistant
const makeInference = async (systemPrompt, lastChat) => {
    prompt = `<|im_start|>system
    ${systemPrompt}
    <|im_start|>user
    ${lastChat.text}
    <|im_start|>assistant`;
    inferred = null;

    fetch(MICROSERVICE_URI)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('LLM server failure');
        })
        .then(data => {inferred = data.response;})
        .catch(err => console.log('Error: LLM server'));
}

// Main
const makeResponse = async (secretary) => {
    const randDelay = Math.floor(Math.random() * 6) + 1;
    await delay(randDelay);

    const systemPrompt = makeSystemPrompt(user);
    const userPrompt = lastChat.text;
    const inference = makeInference(systemPrompt, userPrompt);

    handleResponse(systemPrompt, userPrompt, inference);
}

export default makeResponse;