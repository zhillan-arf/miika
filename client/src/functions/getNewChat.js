const getNewChat = (length, master, secretary, role='master', autoFocus=true, readOnly=false, text='') => {
    return {
        _id: `temp_chat-${length}`,
        userID: master._id,
        date: new Date(),
        role: role,
        userName: role === 'master'? master.name : secretary.name,
        text: text,
        autoFocus: autoFocus,
        readOnly: readOnly,
        lastRecalled: new Date(),
        timesRecalled: 1
    }
}

export default getNewChat;