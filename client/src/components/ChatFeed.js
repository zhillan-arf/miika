import React, { useContext } from "react";
import getProfpicSrc from "../functions/getProfpicSrc";
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
                    key={chat._id}
                    chat={chat}
                    // onEnter={(text) => handleEdit(text, index)}
                    userProfpicSrc={getProfpicSrc('user', user, assistant)}
                    assistantProfpicSrc={getProfpicSrc('assistant', user, assistant)}
                />
            ))}
            {/* Assistant is typing */}
            { asTyping && <ChatBox 
                key='isTyping'
                chat={getIsTyping(chats, user, assistant)}
                assistantProfpicSrc={getProfpicSrc('assistant', user, assistant)}
                isTypingBox={asTyping}
            />}
            {/* Current box */}
            <ChatBox
                key={inputChat._id}
                chat={inputChat}
                onEnter={(text) => handleEnter(text)}
                masterProfpicSrc={getProfpicSrc('user', user, assistant)}
                refocus={refocus}
            />
        </div>
    )
}

export default ChatFeed;