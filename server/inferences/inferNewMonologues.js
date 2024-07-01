import embed from "../embeds/embed.js";
import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";

const inferInitChats = async (contextMonologues) => {
    const contexts = { contextMonologues: contextMonologues }
    const localPath = 'inference/inferInitChats.js';
    const monologuePrompt = await makePrompt(contexts, localPath);

    const monologueTexts = await infer(monologuePrompt);
    
    const newMonologues = await embed(monologueTexts);
    
    const contextMonologues = contextMonologues.concat(newMonologues);
    return [contextMonologues, newMonologues];
}

export default inferInitChats;