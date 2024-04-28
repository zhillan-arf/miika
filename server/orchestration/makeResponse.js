import { config } from 'dotenv';
config();

import getMentionedEntities from './retrievers/getMentionedEntities.js';
import getRecentSummary from './retrievers/getRecentSummary.js';
import getRelevantMemories from './retrievers/getRelevantMemories.js';
import Secretary from '../models/Secretary.js';
import Chat from '../models/Chat.js';
import { readFile } from 'fs/promises';
import path from 'path';

const MICROSERVICE_URI = process.env.MICROSERVICE_URI;

const getRecentChats = async (chats) => {
    const tokenCap = 2000;
    let i = chats.length - 1;
    let tokensLength = 0;
    
    for (i; i >= 0; i--) {
        const tokenLength = chats[i].text.split(' ').length;
        if (tokensLength + tokenLength >= tokenCap) break;
        tokensLength += tokenLength;
    }

    return chats.slice(i + 1, chats.length);
}

const formatRecentChats = (recentChats, userName, secretaryName) => {
    let formattedChats = '';
    if (recentChats.length > 0) formattedChats = '\n' + formattedChats;

    recentChats.forEach(chat => {
        let name = userName;
        if (chat.role === 'secretary') name == secretaryName;
        if (chat.role === 'shadow') name == `Shadow ${name}`;
        
        formattedChats += `${name}:\n${chat.text}\n`;
    });

    return formattedChats.trim();
}

const makeSystemPrompt = async (user, secretary, recentChats) => {
    try {
        const filePath = path.resolve('prompts/main/system.txt');
        const systemTemplate = await readFile(filePath, 'utf8');
        const variables = {
            recentSummary: getRecentSummary(recentChats),
            relevantMemories: getRelevantMemories(recentChats, user),
            recentChats: formatRecentChats(recentChats.slice(0, recentChats.length -1), user.name, secretary.name),
            chatExamples: secretary.chatExamples,
            secretaryLore: secretary.lore,
            secretaryProtocol: secretary.protocol,
            secretaryName: secretary.name,
            pronoun1: (secretary.gender === 'm') ? 'he' : 'she',
            pronoun3: (secretary.gender === 'm') ? 'him' : 'her',
            userName: user.name,
            userProfile: user.profile,
        }

        let systemPrompt = systemTemplate;
        Object.keys(variables).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            systemPrompt = systemPrompt.replace(regex, variables[key]);
        });

        return systemPrompt;

    } catch (err) {
        console.log(`ERROR Making Prompt: ${err}`);
    }
}

const parseNewChats = (inferred, user) => {
    const texts = inferred.split('\n');
    const newChats = texts.map(text => ({
        userID: user._id,
        date: new Date(),
        role: 'secretary',
        text: text,
        autoFocus: false,
        readOnly: true,
        lastRecalled: new Date(),
        timesRecalled: 1,
        mentionedEntities: getMentionedEntities(inferred)
    }));

    return newChats;
}

const makeInference = async (systemPrompt, userPrompt) => {
    const prompt = `<|im_start|>system\n${systemPrompt}\n<|im_start|>user\n${userPrompt}\n<|im_start|>assistant`;

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
        console.log(`${err}`)
    }
}

// Main
const makeResponse = async (user) => {
    try {
        const secretary = await Secretary.findOne({ _id: user.secretaryID });
        const chats = await Chat.find({ userID: user._id }, {userID: 0, readOnly: 0});
        const recentChats = await getRecentChats(chats);
        const lastChat = recentChats.at(-1);

        const systemPrompt = await makeSystemPrompt(user, secretary, recentChats);
        const userPrompt = lastChat.text;
        const inferredChats = await makeInference(systemPrompt, userPrompt);

        const newChats = await Chat.insertMany(inferredChats);
        const scopedNewChats = await Chat.find({ _id: { $in: newChats.map(chat => chat._id) } }).select('-userID -mentionedEntities');
        if (scopedNewChats) return scopedNewChats;
        else throw Error('Failed to make any chat response');
    } catch (err) {
        console.log(`Error making response: ${err}`);
    }
}

export default makeResponse;