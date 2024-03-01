import React, { useState } from "react";
import Chat from "./Chat";

const Chatroom = () => {
    const [chats, setChats] = useState([{id: 'chat-0', text: '', autoFocus: true, readOnly: false}]);
    
    const handleEnter = (newText, index) => {
        const updatedChats = chats.map(chat => ({...chat, readOnly: true}));
        updatedChats[index].text = newText;
        updatedChats.push({key: `chat-${chats.length}`, text: '', autoFocus: true});
        setChats(updatedChats);
    }
    return (
        <div>
            {chats.map((chat, index) => (
                <Chat
                    key={chat.key}
                    readOnly={chat.readOnly}
                    onEnter={(text) => handleEnter(text, index)}
                    autoFocus={chat.autoFocus}
                    initialText={chat.text}
                />
            ))}
        </div>
    )
}

export default Chatroom;