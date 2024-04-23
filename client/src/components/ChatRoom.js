import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader.js";
import ChatBox from "./ChatBox.js";
import Sidebar from "./Sidebar.js";
import io from 'socket.io-client';
import "../assets/chatroom.css";

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const getNewChat = (length, master, secretary, role='master', autoFocus=true, readOnly=false, text='') => {
    return {
        _id: `chat-${length}`,
        userID: master._id,
        date: new Date(),
        role: role,
        userName: role === 'master'? master.name : secretary.name,
        chatClass: '',
        text: text,
        autoFocus: autoFocus,
        readOnly: readOnly,
        lastRecalled: new Date(),
        timesRecalled: 1
    }
}

const fetchData = async () => {
    try {
        const response = await fetch(`${REACT_APP_BACKEND_URI}/api/getchats`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        const master = data.master;
        const secretary = data.secretary;
        const chats = [...data.chats, getNewChat(data.chats.length, master, secretary)];
        return {master, secretary, chats};
    } catch (err) {
        console.log(`Error at fetching chats: ${err}`);
    }
}

const ChatRoom = ({ onLogout }) => {
    const parentRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [master, setMaster] = useState(null);
    const [secretary, setSecretary] = useState(null);
    const [chats, setChats] = useState(null);
    const [socket, setSocket] = useState(null);
    const [receivingResponse, setReceivingResponse] = useState(false);
    const [queueingResponse, setQueueingResponse] = useState(false);

    const getChatClass = async (chats) => {
        try {
            const response = await fetch(`${REACT_APP_BACKEND_URI}/api/getclass`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chats)
            });
            return response.chatClass;
        } catch (err) {
            console.log(`Failed to get chat class: ${err}`);
        }
    }

    const insertChat = async (chat) => {
        try {
            await fetch(`${REACT_APP_BACKEND_URI}/api/insertchat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chat)
            });
        } catch (err) {
            console.log(`Failed to insert data to server: ${err}`);
        }
    }

    const fetchSetData = async () => {
        const data = await fetchData();
        setMaster(data.master);
        setSecretary(data.secretary);
        setChats(data.chats);
        setLoading(false);
    }

    useEffect(() => {fetchSetData()}, []);

    useEffect(() => {
        if (!socket) {
            const newSocket = io(REACT_APP_BACKEND_URI, {
                'transports': ['websocket']
            });
            setSocket(newSocket);
        }
    },[socket]);

    useEffect(() => {
        if (socket) {
            socket.on('receiveResponse', (newChats) => {
                setChats(chats.concat(newChats));  // user permitted to input more before receive response
                if (queueingResponse) {
                    setQueueingResponse(false);
                    socket.emit('requestResponse', master);
                } else {
                    setReceivingResponse(false);
                }
            });
        }
    }, [socket, queueingResponse, chats, master]);

    const handleEnter = async (newText, index) => {
        const updatedChats = chats.map(chat => ({...chat, readOnly: true}));
        updatedChats[index].text = newText;
        updatedChats[index].date = new Date();
        updatedChats[index].chatClass = getChatClass(updatedChats.slice(-10));
        insertChat(updatedChats[index]);
        
        updatedChats.push(getNewChat(chats.length, master, secretary));
        setChats(updatedChats);

        if (!receivingResponse) {
            setReceivingResponse(true);
            socket.emit('requestResponse', master);
        } else setQueueingResponse(true);
    }

    const getProfpicSrc = (type) => {
        if (type === 'master') return `data:image/png;base64,${master.profpic}`;
        else if (type === 'secretary') return `data:image/png;base64,${secretary.profpic}`;
    }

    if (loading) {
        return (<div className="loading">Loading...</div>);
    } else return (
        <div className="container">
            <Sidebar masterName={master.name} masterProfpicSrc={getProfpicSrc('master')}>
                1 - midsummer is app...
            </Sidebar>
            <div className="room" ref={parentRef}>
                <ChatHeader parentRef={parentRef}/>
                <div className="chat-feed">
                    {/* Previous transcripts */}
                    {chats.slice(0, -1).map((chat, index) => (
                        <ChatBox
                            key={chat._id}
                            chat={chat}
                            onEnter={(text) => handleEnter(text, index)}
                            masterProfpicSrc={getProfpicSrc('master')}
                            secretaryProfpicSrc={getProfpicSrc('secretary')}
                        />
                    ))}
                    {/* Secretary info */}
                    {receivingResponse && <ChatBox 
                        key='isTyping'
                        chat={getNewChat(chats.length, master, secretary, 'secretary', 'false', true, `${secretary.name} is typing...`)}
                        secretaryProfpicSrc={getProfpicSrc('secretary')}
                        isTypingBox={true}
                    />}
                    {/* Current input box */}
                    {chats.slice(-1).map((chat, index) => (
                        <ChatBox
                            key={chat._id}
                            chat={chat}
                            onEnter={(text) => handleEnter(text, index)}
                            masterProfpicSrc={getProfpicSrc('master')}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;