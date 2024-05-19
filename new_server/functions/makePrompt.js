const makePrompt = async (contexts, localPath) => {
    const filePath = resolve(`prompts/${localPath}.txt`);
    let prompt = await readFile(filePath, 'utf8');

    for (const key in contexts) {
        const regex = new RegExp(`{{${key}}}, 'g`);
        prompt = prompt.replace(regex. contexts[key]);
    }

    return prompt;
}

export default makePrompt;