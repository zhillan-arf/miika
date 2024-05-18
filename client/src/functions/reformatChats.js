export const reformatChat = (chat) => ({
    ...chat,
    date: new Date(chat.date),
    autoFocus : false,
    readOnly : true,
});

export const reformatChats = (chats) =>  {
    return chats.map(reformatChat);
}