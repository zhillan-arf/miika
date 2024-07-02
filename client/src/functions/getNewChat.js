const getNewChat = (length, user, assistant, role='user', autoFocus=true, readOnly=false, text='') => {
    return {
        _id: `temp_chat-${length}`,
        userID: master._id,
        date: new Date(),
        role: role,
        userName: role === 'user'? user.name : assistant.name,
        text: text,
        autoFocus: autoFocus,
        readOnly: readOnly,
        lastRecalled: new Date(),
        timesRecalled: 1
    }
}

export default getNewChat;