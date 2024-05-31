import embed from "../embeds/embed,js";
import makePrompt from "../functions/makePrompt,js";
import infer from "./infer.js";

const inferInitChats = async (contextMonologues) => {
    const contexts = { contextMonologues: contextMonologues }

    const localPath = 'inference/inferInitChats.js';
    const initPrompt = await makePrompt(contexts, localPath);

    const chatsTexts = await infer(initPrompt);
    
    const chats = await embed(chatsTexts);
    
    return chats;
}

export default inferInitChats;