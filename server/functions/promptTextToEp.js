const promptTextToEp = (userID, role, text) => {
    const ep = {
        userID: userID,
        type: 'chat',
        date: new Date(),
        role: role,
        text: text,
        metatext: null,
        lastRetrieved: new Date(),
        timesRetrieved: 1,
        embedding: null
    }

    return ep;    
}

export default promptTextToEp;