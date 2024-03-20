import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader.js";
import ChatBox from "./ChatBox.js";
import Sidebar from "./Sidebar.js";
import { useSocket } from "./ServerSocket.js";
import "../assets/chatroom.css";

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const ChatRoom = () => {
    const parentRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [master, setMaster] = useState(null);
    const [secretary, setSecretary] = useState(null);
    const [chats, setChats] = useState([]);
    const [isResponded, setIsResponded] = useState(true);

    const getEmptyChat = (role) => {
        return {
            _id: `chat-${chats.length}`,
            userID: master._id,
            date: new Date(),
            role: role,
            userName: role === 'master'? master.name : secretary.name,
            chatClass: '',
            text: '',
            autoFocus: true,
            readOnly: false,
            lastRecalled: new Date(),
            timesRecalled: 1
        }
    }

    useEffect(() => {
        const socketInstance = useSocket(REACT_APP_BACKEND_URI);
        setSocket(socketInstance);
        socket.on('chatsFromSecretary', handleChatsFromSecretary);

        const fetchData = async () => {
            try {
                const response = await fetch(`${REACT_APP_BACKEND_URI}/api/getchats`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json()
                setMaster(data.master);
                setSecretary(data.secretary);
                setChats(...data.chat, getEmptyChat());
            } catch (error) {
                console.log(`Error at fetching chats: ${error}`);
            }
        }
        fetchData();

        return () => {
            socket.disconnect();
          };
    });

    const masterProfpicSrc = `data:image/png;base64,${master.profpic}`;
    const secretaryProfpicSrc = `data:image/png;base64,${secretary.profpic}`;
    
    const handleEnter = async (newText, index) => {
        const updatedChats = chats.map(chat => ({...chat, readOnly: true}));
        updatedChats[index].text = newText;
        updatedChats[index].date = new Date();

        try {
            const response = await fetch(`${REACT_APP_BACKEND_URI}/api/getclass`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedChats.slice(-10))
            });
            updatedChats[index].chatClass = response.chatClass;
        } catch (err) {
            console.log("Failed to get chat class");
            return;
        }
        
        try {
            await fetch(`${REACT_APP_BACKEND_URI}/api/insertchats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedChats[index])
            });
        } catch (err) {
            console.log("Failed to insert data to server");
            return;
        }

        updatedChats.push(getEmptyChat());
        setChats(updatedChats);    
        if (socket) socket.emit('requestResponse', user);
    }

    const handleResponse = (newChats) => {
        setChats(chats.concat(newChats));
        setIsResponded(true);
    }

    return (
        <div className="container">
            <Sidebar masterName={master.name} masterProfpicSrc={masterProfpicSrc}>
                1 - midsummer is app...
            </Sidebar>
            <div className="room" ref={parentRef}>
                <ChatHeader parentRef={parentRef}/>
                <div className="chat-feed">
                    {chats.map((chat, index) => (
                        <ChatBox
                            key={chat._id}
                            chat={chat}
                            onEnter={(text) => handleEnter(text, index)}
                            masterProfpicSrc={masterProfpicSrc}
                            secretaryProfpicSrc={secretaryProfpicSrc}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;