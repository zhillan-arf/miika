const formatChats =  async (responses) => {
    let newResponses = responses.map(response => {

        let contents = response.content.split(/^ASSISTANT:\s*/gm)
            .filter(content => content.trim() !== '');

        const newResponse = contents.map(content => {
            const data = {
                role: response.role,
                content: content.trim(),
                date: new Date()
            }

            return data;
        });

        return newResponse;
    });

    newResponses = newResponses.flat()
    return newResponses;
}

export default formatChats;