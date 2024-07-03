import getNewChat from "./getNewChat";

const getIsTyping = (chats, user, assistant) => {
    return getNewChat(
        chats.length, 
        `${assistant.name} is typing...`,
        'assistant',
        false,
        true
    )
}

export default getIsTyping;