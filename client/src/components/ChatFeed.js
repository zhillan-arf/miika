import React, { useContext } from "react";
import { getUserProfpic, getAsProfpic } from '../functions/getProfpicSrc';
import getIsTyping from "../functions/getIsTyping";
import ChatBox from "./ChatBox";
import { DataContext } from "../hooks/DataProvider";
import '../assets/chatfeed.css';

const ChatFeed = ({ asTyping, refocus, handleEnter }) => {
    const { user, assistant, chats, inputChat } = useContext(DataContext);
    
    return (
        <div className="chat-feed">
            {/* Previous transcripts */}
            {chats.map((chat) => (
                <ChatBox
                    key={chat.chatID}
                    chat={chat}
                    // onEnter={(text) => handleEdit(text, index)}
                    userProfpicSrc={getUserProfpic(user)}
                    assistantProfpicSrc={getAsProfpic(assistant)}
                />
            ))}
            {/* Assistant is typing */}
            { asTyping && <ChatBox 
                key='isTyping'
                chat={getIsTyping(chats, user, assistant)}
                assistantProfpicSrc={getAsProfpic(assistant)}
                isTypingBox={asTyping}
            />}
            {/* Current box */}
            <ChatBox
                key={inputChat.chatID}
                chat={inputChat}
                onEnter={(text) => handleEnter(text)}
                userProfpicSrc={getUserProfpic(user)}
                refocus={refocus}
            />
        </div>
    )
}

export default ChatFeed;