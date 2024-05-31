import infer from "./infer.js";

const inferAct = async (recentChats) => {
    const contexts = { recentChats: recentChats }
    const localPath = 'inference/inferAct';
    const actPrompt = await makePrompt(contexts, localPath);
    
    let act = true;
    try {
        const act = (await infer(actPrompt)).act;
    
    } catch (err) {
        console.log(err);
    }

    return act;
}

export default inferAct;