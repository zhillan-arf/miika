const getRecentChats = async (chats) => {
    const tokenCap = 2000;
    let i = chats.length - 1;
    let tokensLength = 0;
    
    for (i; i >= 0; i--) {
        const tokenLength = chats[i].text.split(' ').length;
        if (tokensLength + tokenLength >= tokenCap) break;
        tokensLength += tokenLength;
    }

    return chats.slice(i + 1, chats.length);
}

export default getRecentChats;