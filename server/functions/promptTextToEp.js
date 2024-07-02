const promptTextToEp = (userID, role, text) => {
    const ep = {
        userID: userID,
        type: 'chat',
        date: Date(),
        role: role,
        text: text,
        metatext: null,
        lastRetrieved: Date(),
        timesRetrieved: 1,
        embedding: null
    }

    return ep;    
}

export default promptTextToEp;