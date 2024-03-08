import React, { useState } from "react";
import Chat from "./Chat";
import "../assets/chatroom.css";

const Chatroom = () => {
    const [chats, setChats] = useState([{id: 'chat-0', text: '', autoFocus: true, readOnly: false}]);
    
    const handleEnter = (newText, index) => {
        const updatedChats = chats.map(chat => ({...chat, readOnly: true}));
        updatedChats[index].text = newText;
        updatedChats.push({id: `chat-${chats.length}`, text: '', autoFocus: true, readOnly: false});
        setChats(updatedChats);
    }
    return (
        <div className="container">
            <div className="container-chatroom">
                {chats.map((chat, index) => (
                    <Chat
                    key={chat.id}
                        readOnly={chat.readOnly}
                        onEnter={(text) => handleEnter(text, index)}
                        autoFocus={chat.autoFocus}
                        initialText={chat.text}
                    />
                ))}
            </div>
        </div>
    );
}

export default Chatroom;