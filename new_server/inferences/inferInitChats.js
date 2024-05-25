import embed from "../embeds/embed";
import makePrompt from "../functions/makePrompt";
import infer from "./infer";

const inferInitChats = async (contextMonologues) => {
    const contexts = { contextMonologues: contextMonologues }

    const localPath = 'inference/inferInitChats.js';
    const initPrompt = await makePrompt(contexts, localPath);

    const chatsTexts = await infer(initPrompt);
    
    const chats = await embed(chatsTexts);
    
    return chats;
}

export default inferInitChats;