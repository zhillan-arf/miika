import getMentionedEntities from './retrievers/getMentionedEntities.js';
import getRecentSummary from './retrievers/getRecentSummary.js';
import getRelevantMemories from './retrievers/getRelevantMemories.js';
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
            chatExamples: secretary.chatExamples,
            secretaryLore: secretary.lore,
            pronoun1: (secretary.gender === 'm') ? 'he' : 'she',
            pronoun3: (secretary.gender === 'm') ? 'him' : 'her',
            secretaryProtocol: secretary.protocol,
            userName: user.name,
            userProfile: user.profile,
            recentSummary: getRecentSummary(recentChats),
            relevantMemories: getRelevantMemories(recentChats, user),
            formattedRecentChats: formatRecentChats(recentChats)
        }
        return fillSystemTemplate(systemTemplate, variables);
    } catch (err) {
        return `ERROR Making Prompt: ${err}`;
    }
}

// Assistant
const parseNewChats = (inferred, user) => {
    const texts = inferred.split('\n');
    const newChats = texts.map(text => ({
        _id: null,
        userID: user._id,
        date: new Date(),
        role: 'secretary',
        chatClass: null,
        text: text,
        autoFocus: false,
        readOnly: true,
        lastRecalled: new Date(),
        timesRecalled: 1,
        mentionedEntities: getMentionedEntities(inferred)
    }));
}

const makeInference = async (systemPrompt, lastChat) => {
    const prompt = `<|im_start|>system\n${systemPrompt}\n<|im_start|>user\n${lastChat.text}\n<|im_start|>assistant`;

    try {
        const response = fetch(`${MICROSERVICE_URI}/api/infer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: prompt})
        });

        if (response.ok) {
            return parseNewChats(response.json().inferred);
        } else throw new Error('LLM server failure');

    } catch (err) {
        console.log(`ERROR: ${err}`)
    }
}

// Main
const makeResponse = async (secretary) => {
    try {
        const randDelay = Math.floor(Math.random() * 4) + 1;
        await delay(randDelay);

        const systemPrompt = makeSystemPrompt(user);
        const userPrompt = lastChat.text;
        const inferredChats = makeInference(systemPrompt, userPrompt);
        await Chat.insertMany(inferredChats);
        return inferredChats;
    } catch (err) {
        console.log("Error making response");
    }
}

export default makeResponse;