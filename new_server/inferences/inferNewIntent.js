import makePrompt from "../functions/makePrompt.js";
import infer from "./infer.js";

const inferNewIntent = async (contextMonologues, secIntent) => {
    const contexts = {
        contextMonologues: contextMonologues,
        secIntent: secIntent
    }

    const localPath = 'inference/inferNewIntent';
    const thoughtsPrompt = await makePrompt(contexts, localPath);

    const thoughts = await infer(thoughtsPrompt);

    return thoughts;
}

export default inferNewIntent;