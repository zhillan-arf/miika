import getRecentSummary from "../retrievers/getRecentSummary.js";
import getRelevantMemories from "../retrievers/getRelevantMemories.js";
import chatsToText from "./chatsToText.js";
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import fillTemplate from "./fillTemplate.js";

const makeSystemPrompt = async (user, secretary, recentChats) => {
    try {
        const filePath = resolve('prompts/main/system.txt');
        const systemTemplate = await readFile(filePath, 'utf8');
        const variables = {
            recentSummary: getRecentSummary(recentChats),
            relevantMemories: getRelevantMemories(recentChats, user),
            recentChats: chatsToText(recentChats.slice(0, recentChats.length -1)),
            chatExamples: secretary.chatExamples,
            secretaryLore: secretary.lore,
            secretaryProtocol: secretary.protocol,
            secretaryName: secretary.name,
            pronoun1: (secretary.gender === 'm') ? 'he' : 'she',
            pronoun3: (secretary.gender === 'm') ? 'him' : 'her',
            userName: user.name,
            userProfile: user.profile
        }
        
        const systemPrompt = fillTemplate(systemTemplate, variables);

        return systemPrompt;

    } catch (err) {
        console.log(`ERROR Making Prompt: ${err}`);
    }
}

export default makeSystemPrompt;