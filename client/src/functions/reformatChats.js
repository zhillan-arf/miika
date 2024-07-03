export const reformatChat = (chat, idx) => ({
    ...chat,
    chatID: idx,
    date: new Date(chat.date),
    autoFocus : false,
    readOnly : true,
});

export const reformatChats = (chats) =>  {
    return chats.map((chat, idx) => {reformatChat(chat, idx)});
}