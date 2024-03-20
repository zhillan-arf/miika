const delay = (duration) => {
    return new Promise(resolve => setTimeout(resolve, duration));
}

const makeResponse = async (secretary) => {
    const randDelay = Math.floor(Math.random() * 10) + 1;
    await delay(randDelay);

    const systemPrompt = makeSystemPrompt(user);
    const userPrompt = makeUserPrompt(user);
    const assistantPrompt = makeAssistantPrompt(systemPrompt, userPrompt);

    handleResponse(systemPrompt, userPrompt, assistantPrompt);
}

export default makeResponse;