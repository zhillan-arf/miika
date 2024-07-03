const getNewChat = (length, content='', role='user', autoFocus=true, readOnly=false) => {
    return {
        chatID: length,
        role: role,
        content: content,
        date: new Date(),
        autoFocus: autoFocus,
        readOnly: readOnly,
    }
}

export default getNewChat;