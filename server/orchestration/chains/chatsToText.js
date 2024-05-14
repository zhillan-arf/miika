const chatsToText = (chats) => {
    let formattedChats = '';
    if (chats.length > 0) formattedChats = '\n' + formattedChats;

    chats.forEach(chat => {
        const name = `[${chat.role.toUpperCase()}]`;
        formattedChats += `${name}: ${chat.text}\n`;
    });

    return formattedChats.trim();
}

export default chatsToText;