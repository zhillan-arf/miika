import React, { useContext } from "react";
import getProfpicSrc from "../functions/getProfpicSrc";
import getIsTyping from "../functions/getIsTyping";
import ChatBox from "./ChatBox";
import { DataContext } from "../hooks/DataProvider";
import '../assets/chatfeed.css';

const ChatFeed = ({ secTyping, refocus, handleEnter }) => {
    const { master, secretary, chats, inputChat } = useContext(DataContext);
    
    return (
        <div className="chat-feed">
            {/* Previous transcripts */}
            {chats.map((chat) => (
                <ChatBox
                    key={chat._id}
                    chat={chat}
                    // onEnter={(text) => handleEdit(text, index)}
                    masterProfpicSrc={getProfpicSrc('master', master, secretary)}
                    secretaryProfpicSrc={getProfpicSrc('secretary', master, secretary)}
                />
            ))}
            {/* Secretary is typing */}
            {secTyping && <ChatBox 
                key='isTyping'
                chat={getIsTyping(chats, master, secretary)}
                secretaryProfpicSrc={getProfpicSrc('secretary', master, secretary)}
                isTypingBox={secTyping}
            />}
            {/* Current box */}
            <ChatBox
                key={inputChat._id}
                chat={inputChat}
                onEnter={(text) => handleEnter(text)}
                masterProfpicSrc={getProfpicSrc('master', master, secretary)}
                refocus={refocus}
            />
        </div>
    )
}

export default ChatFeed;