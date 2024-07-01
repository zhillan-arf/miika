const promptTextToEps = (userID, text) => {
    const ep = {
        userID: userID,
        type: 'chat',
        date: Date(),
        role: 'assistant',
        text: text,
        metatext: null,
        lastRetrieved: Date(),
        timesRetrieved: 1,
        embedding: null
    }

    return ep;    
}