import React, { useState, useRef, useEffect, useCallback } from "react";
import ChatHeader from "./ChatHeader.js";
import ChatBox from "./ChatBox.js";
import Sidebar from "./Sidebar.js";
import io from 'socket.io-client';
import "../assets/chatroom.css";

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const ChatRoom = ({ onLogout }) => {
    const parentRef = useRef(null);
    const [chats, setChats] = useState([]);
    const [master, setMaster] = useState(null);
    const [socket, setSocket] = useState(io(REACT_APP_BACKEND_URI, {'transports': ['websocket']}));
    const [secretary, setSecretary] = useState(null);
    const [receivingResponse, setReceivingResponse] = useState(false);
    const [queueingResponse, setQueueingResponse] = useState(false);

    const getNewChat = (role='master', autoFocus=true, readOnly=false, text='') => {
        return {
            _id: `chat-${chats.length}`,
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
            const data = await response.json()
            setMaster(data.master);
            setSecretary(data.secretary);
            setChats(...data.chat, getNewChat());
        } catch (err) {
            console.log(`Error at fetching chats: ${err}`);
        }
    }
    fetchData();

    const requestResponse = useCallback(() => {
        setReceivingResponse(true);
        socket.emit('requestResponse', master);
    }, [socket, master]);

    const handleResponse = useCallback((newChats) => {
        setChats(chats.concat(newChats));
        if (queueingResponse) {
            setQueueingResponse(false);
            requestResponse();
        } else setReceivingResponse(false);
    }, [chats, queueingResponse, requestResponse]);

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

    useEffect(() => {
        const newSocket = io(REACT_APP_BACKEND_URI, {
            'transports': ['websocket']
        });

        newSocket.on('receiveResponse', (data) => {
            handleResponse(data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.off('receiveResponse');
            newSocket.disconnect();
          };
    }, [handleResponse]);

    const handleEnter = async (newText, index) => {
        const updatedChats = chats.map(chat => ({...chat, readOnly: true}));
        updatedChats[index].text = newText;
        updatedChats[index].date = new Date();
        updatedChats[index].chatClass = getChatClass(updatedChats.slice(-10));
        insertChat(updatedChats[index]);
        
        updatedChats.push(getNewChat());
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

    return (
        <div className="container">
            {console.log("chatroom returning page")}
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
                        chat={getNewChat('secretary', 'false', true, `${secretary.name} is typing...`)}
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