const formatRecentChats = (recentChats, userName, secretaryName) => {
    let formattedChats = '';
    if (recentChats.length > 0) formattedChats = '\n' + formattedChats;

    recentChats.forEach(chat => {
        let name = userName;
        if (chat.role === 'secretary') name == secretaryName;
        if (chat.role === 'shadow') name == `Shadow ${name}`;
        
        formattedChats += `${name}:\n${chat.text}\n`;
    });

    return formattedChats.trim();
}

export default formatRecentChats;