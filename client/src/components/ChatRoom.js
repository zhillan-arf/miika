import React, { useState, useRef } from "react";
import ChatHeader from "./ChatHeader.js";
import ChatBox from "./ChatBox.js";
import Sidebar from "./Sidebar.js";
import "../assets/chatroom.css";

const ChatRoom = () => {
    const parentRef = useRef(null);
    const getDisplayTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}.${minutes < 10 ? '0' : ''}${minutes}`;
    }

    const masterName = "danny";

    const [displayTime, setDisplayTime] = useState(getDisplayTime());
    const [chats, setChats] = useState([{
        id: 'chat-0', 
        userName: masterName,
        displayTime: displayTime,
        text: '', 
        autoFocus: true, 
        readOnly: false
    }]);
    
    const handleEnter = (newText, index) => {
        const updatedChats = chats.map(chat => ({...chat, readOnly: true}));
        updatedChats[index].text = newText;
        setDisplayTime(getDisplayTime());
        updatedChats[index].displayTime = displayTime;
        updatedChats.push({
            id: `chat-${chats.length}`, 
            userName: masterName,
            displayTime: displayTime,
            text: '', 
            autoFocus: true, 
            readOnly: false
        });
        setChats(updatedChats);
        // async function to insert secretary response
    }
    return (
        <div className="container">
            <Sidebar masterName={masterName}>
                1 - midsummer is app...
            </Sidebar>
            <div className="room" ref={parentRef}>
                <ChatHeader parentRef={parentRef}/>
                <div className="chat-feed">
                    {chats.map((chat, index) => (
                        <ChatBox
                            key={chat.id}
                            userName={chat.userName}
                            displayTime={chat.displayTime}
                            readOnly={chat.readOnly}
                            autoFocus={chat.autoFocus}
                            initialText={chat.text}
                            onEnter={(text) => handleEnter(text, index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;