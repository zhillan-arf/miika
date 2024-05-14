import getNewChat from "./getNewChat";

const getIsTyping = (chats, master, secretary) => {
    return getNewChat(chats.length, master, secretary, 'secretary', 'false', true, `${secretary.name} is typing...`)
}

export default getIsTyping;