import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader.js";
import ChatBox from "./ChatBox.js";
import Sidebar from "./Sidebar.js";
import "../assets/chatroom.css";

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const ChatRoom = () => {
    const parentRef = useRef(null);
    const [master, setMaster] = useState(null);
    const [secretary, setSecretary] = useState(null);
    const [chats, setChats] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch(`${REACT_APP_BACKEND_URI}/api/getchats`, {
                    method: 'POST',
                    credentials: 'include'
                });
                const data = await response.json()
                setMaster(data.master);
                setSecretary(data.secretary);
                setChats(data.chats);
            } catch (error) {
                console.log(`Error at fetching chats: ${error}`);
            }
        }
    });

    const masterName = master.name;
    const masterProfpicBase64 = master.profpic.toString('base64');
    const masterProfpicSrc = `data:image/png;base64,${masterProfpicBase64}`;
    
    const secretaryName = secretary.name;
    const secretaryProfpicBase64 = secretary.profpic.toString('base64');
    const secretaryProfpicSrc = `data:image/png;base64,${secretaryProfpicBase64}`;

    // Next: render data into chat array!

    // const [chats, setChats] = useState([{
    //     id: 'chat-0', 
    //     userName: masterName,
    //     date: new Date(),
    //     text: '',
    //     autoFocus: true, 
    //     readOnly: false
    // }]);
    
    const handleEnter = (newText, index) => {
        const updatedChats = chats.map(chat => ({...chat, readOnly: true}));
        updatedChats[index].text = newText;
        setDisplayTime(getDisplayTime());
        updatedChats[index].date = new Date();
        updatedChats.push({
            id: `chat-${chats.length}`, 
            userName: masterName,
            date: new Date(),
            text: '', 
            autoFocus: true, 
            readOnly: false
        });
        setChats(updatedChats);
        // async function to insert secretary response
    }
    return (
        <div className="container">
            <Sidebar masterName={masterName} masterProfpicSrc={masterProfpicSrc}>
                1 - midsummer is app...
            </Sidebar>
            <div className="room" ref={parentRef}>
                <ChatHeader parentRef={parentRef}/>
                <div className="chat-feed">
                    {chats.map((chat, index) => (
                        <ChatBox
                            key={chat.id}
                            userName={chat.userName}
                            date={chat.date}
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