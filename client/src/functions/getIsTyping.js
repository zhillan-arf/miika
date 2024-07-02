import getNewChat from "./getNewChat";

const getIsTyping = (chats, user, assistant) => {
    return getNewChat(chats.length, user, assistant, 'assistant', 'false', true, `${assistant.name} is typing...`)
}

export default getIsTyping;