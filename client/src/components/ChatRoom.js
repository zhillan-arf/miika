import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { DataContext } from '../hooks/DataProvider';
import { SocketContext } from '../hooks/SocketProvider';
import insertChat from '../functions/insertChat';
import getNewChat from '../functions/getNewChat';
import Loading from './Loading';
import Sidebar from './Sidebar';
import getProfpicSrc from '../functions/getProfpicSrc';
import ChatFeed from './ChatFeed';
import ChatHeader from './ChatHeader';
import reformatDates from '../functions/reformatDates';
import "../assets/chatroom.css";

const ChatRoom = () => {
    const { loading, master, secretary, inputChat, setChats, setInputChat } = useContext(DataContext);
    const { socket } = useContext(SocketContext);

    const [waitingResponse, setWaitingResponse] = useState(false);
    const [secTyping, setSecTyping] = useState(false);
    const [queueing, setQueueing] = useState(false);
    const [refocus, setRefocus] = useState(0);

    const parentRef = useRef(null);
    const receiveRef = useRef(null);
    const prevSecTypingRef = useRef(secTyping);

    const receiveResponse = useCallback((newChat) => {
        setChats(chats => {
            return chats.concat(reformatDates(newChat))
        });

        if (queueing & !waitingResponse) {
            setQueueing(false);
            if (socket) socket.emit('requestResponse', master);
        }
    }, [socket, queueing, master, waitingResponse]);

    useEffect(() => {
        receiveRef.current = receiveResponse;
    }, [receiveResponse]);

    useEffect(() => {
        if (prevSecTypingRef.current !== secTyping) {
            setRefocus((prevRefocus) => !prevRefocus);
            prevSecTypingRef.current = secTyping;
        }
    }, [secTyping, refocus]);

    useEffect(() => {
        if (socket && socket.connected)  {
            socket.on('waitingResponse', setWaitingResponse);
            socket.on('nowTyping', setSecTyping);
            socket.on('receiveResponse', receiveRef.current);

            return () => {
                socket.off('waitingResponse');
                socket.off('nowTyping');
                socket.off('receiveResponse');
            }
        }
    }, [socket]);

    const handleEnter = useCallback(async (text) => {
        const newChat = { ...inputChat, autoFocus: false, readOnly: true, text: text, date: new Date(), lastRecalled: new Date() };
        newChat._id = await insertChat(newChat);

        setChats(chats => {
            setInputChat(getNewChat(chats.length, master, secretary));
            return chats.concat(newChat);
        });

        if (!waitingResponse) {
            socket.emit('requestResponse', master);
        } else setQueueing(true);

        setRefocus(refocus + 1);

    }, [socket, master, secretary, inputChat, waitingResponse, refocus]);

    if (loading) return <Loading />;

    return (
        <div className="container">
            <Sidebar masterName={master.name} masterProfpicSrc={getProfpicSrc('master', master, secretary)}>
                1 - midsummer is app...
            </Sidebar>
            <div className="room" ref={parentRef}>
                <ChatHeader parentRef={parentRef}/>
                <ChatFeed secTyping={secTyping} refocus={refocus} handleEnter={handleEnter} />
            </div>
        </div>
    );
}

export default ChatRoom;
