import React, { useState, useRef, useEffect, useCallback } from "react";
import reformatDates from "../functions/reformatDates.js";
import insertChat from "../functions/insertChat.js";
import getNewChat from "../functions/getNewChat.js";
import delay from "../functions/delay.js";
import ChatHeader from "./ChatHeader.js";
import ChatBox from "./ChatBox.js";
import Sidebar from "./Sidebar.js";
import io from 'socket.io-client';
import "../assets/chatroom.css";

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const ChatRoom = ({ onLogout }) => {
    const [loading, setLoading] = useState(true);
    const [master, setMaster] = useState(null);
    const [secretary, setSecretary] = useState(null);
    const [chats, setChats] = useState([]);
    const [inputChat, setInputChat] = useState(null);
    const [socket, setSocket] = useState(null);
    const [receivingResponse, setReceivingResponse] = useState(false);
    const [queueingResponse, setQueueingResponse] = useState(false);

    const parentRef = useRef(null);
    const receiveRef = useRef(null);
    
    useEffect(() => {
        const fetchSetData = async () => {
            try {
                const response = await fetch(`${REACT_APP_BACKEND_URI}/api/getchats`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();

                setMaster(data.master);
                setSecretary(data.secretary);
                setInputChat(getNewChat(data.chats.length, data.master, data.secretary));
                setChats(reformatDates(data.chats));
                setLoading(false);

            } catch (err) {
                console.log(`Error at fetching chats: ${err}`);
            }
        }
    
        fetchSetData();
    }, []);

    const receiveResponse = useCallback((newChats) => {
        newChats = reformatDates(newChats);
        setChats(chats => {
            return chats.concat(newChats)
        });
        if (queueingResponse) {
            setQueueingResponse(false);
            if (socket) socket.emit('requestResponse', master);
        } else {
            setReceivingResponse(false);
        }
    }, [socket, queueingResponse, master]);

    useEffect(() => {
        receiveRef.current = receiveResponse;
    }, [receiveResponse]);

    useEffect(() => {
        const connectSocket = () => {
            const newSocket = io(REACT_APP_BACKEND_URI, { 
                'transports': ['websocket'] 
            });
    
            newSocket.on('connect', () => {
                setSocket(newSocket);
            });

            newSocket.on('receiveResponse', receiveRef.current);
    
            newSocket.on('connect_error', (err) => {
                console.error('Socket error:', err);
                setTimeout(connectSocket, 5000);
            });
    
            newSocket.on('disconnect', (reason) => {
                if (reason === 'io server disconnect') {
                  setTimeout(connectSocket, 5000);
                }
            });
    
            return newSocket;
        }

        const newSocket = connectSocket();

        return () => {
            if (newSocket) newSocket.disconnect();
        }
    },[]);

    const handleEnter = useCallback(async (text) => {
        const newChat = {
            ...inputChat, 
            autoFocus: false,
            readOnly: true,
            text: text,
            date: new Date(),
            lastRecalled: new Date()
        };

        newChat._id = await insertChat(newChat);
        setChats(chats => {
            setInputChat(getNewChat(chats.length, master, secretary));
            return chats.concat(newChat);
        });
        
        if (!receivingResponse) {
            await delay(3);
            setReceivingResponse(true);
            socket.emit('requestResponse', master);
        } else setQueueingResponse(true);

    }, [socket, master, secretary, inputChat, receivingResponse]);

    const getProfpicSrc = (type) => {
        if (type === 'master') return `data:image/png;base64,${master.profpic}`;
        else if (type === 'secretary') return `data:image/png;base64,${secretary.profpic}`;
    }

    const getIsTyping = () => {
        return getNewChat(chats.length, master, secretary, 'secretary', 'false', true, `${secretary.name} is typing...`)
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
                    {chats.map((chat) => (
                        <ChatBox
                            key={chat._id}
                            chat={chat}
                            // onEnter={(text) => handleEdit(text, index)}
                            masterProfpicSrc={getProfpicSrc('master')}
                            secretaryProfpicSrc={getProfpicSrc('secretary')}
                        />
                    ))}
                    {/* Secretary is typing */}
                    {receivingResponse && <ChatBox 
                        key='isTyping'
                        chat={getIsTyping()}
                        secretaryProfpicSrc={getProfpicSrc('secretary')}
                        isTypingBox={true}
                    />}
                    {/* Current box */}
                    <ChatBox
                        key={inputChat._id}
                        chat={inputChat}
                        onEnter={(text) => handleEnter(text)}
                        masterProfpicSrc={getProfpicSrc('master')}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;