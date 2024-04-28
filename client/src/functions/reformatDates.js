const reformatDates = (chats) => {
    return chats.map(chat => ({
        ...chat,
        date: new Date(chat.date),
        lastRecalled: new Date(chat.lastRecalled)
    }));
}

export default reformatDates;