const reformatChat = (chat) => ({
    ...chat,
    date: new Date(chat.date),
    lastRecalled: new Date(chat.lastRecalled)
});

const reformatDates = (input) => {
    if (Array.isArray(input)) {
        return input.map(reformatChat);
    } else {
        return reformatChat(input);
    }
}

export default reformatDates;