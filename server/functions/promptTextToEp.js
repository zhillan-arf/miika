const promptTextToEp = (userID, role, content) => {
    const data = {
        role: role,
        content: content
    }

    const ep = {
        userID: userID,
        type: 'chat',
        date: new Date(),
        data: data,
        summary: null,
        embedding: null
    }

    return ep;    
}

export default promptTextToEp;