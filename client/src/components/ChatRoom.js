import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { DataContext } from '../hooks/DataProvider';
import { SocketContext } from '../hooks/SocketProvider';
import insertChat from '../functions/insertChat';
import getNewChat from '../functions/getNewChat';
import Loading from './Loading';
import Sidebar from './Sidebar';
import { getUserProfpic } from '../functions/getProfpicSrc';
import ChatFeed from './ChatFeed';
import ChatHeader from './ChatHeader';
import { reformatChat } from '../functions/reformatChats';
import "../assets/chatroom.css";

const ChatRoom = () => {
    const { loading, user, assistant, inputChat, setChats, setInputChat } = useContext(DataContext);
    const { socket } = useContext(SocketContext);

    const [waitingResponse, setWaitingResponse] = useState(false);
    const [asTyping, setAsTyping] = useState(false);
    const [queueing, setQueueing] = useState(false);
    const [refocus, setRefocus] = useState(0);

    const parentRef = useRef(null);
    const receiveRef = useRef(null);
    const prevAsTypingRef = useRef(asTyping);

    const receiveResponse = useCallback((newChat) => {
        setChats(chats => {
            return chats.concat(reformatChat(newChat, chats.length))
        });

        if (queueing & !waitingResponse) {
            setQueueing(false);
            if (socket) socket.emit('requestResponse', user);
        }
    }, [socket, queueing, user, waitingResponse, setChats]);

    useEffect(() => {
        receiveRef.current = receiveResponse;
    }, [receiveResponse]);

    useEffect(() => {
        if (prevAsTypingRef.current !== asTyping) {
            setRefocus((prevRefocus) => !prevRefocus);
            prevAsTypingRef.current = asTyping;
        }
    }, [asTyping, refocus]);

    useEffect(() => {
        if (socket && socket.connected)  {

            socket.on('waitingResponse', setWaitingResponse);
            socket.on('nowTyping', setAsTyping);
            socket.on('receiveResponse', receiveRef.current);

            return () => {
                socket.off('waitingResponse');
                socket.off('nowTyping');
                socket.off('receiveResponse');
            }
        }
    }, [socket]);

    const handleEnter = useCallback(async (content) => {
        const newChat = {
            ...inputChat,
            content: content,
            date: new Date(),
            autoFocus: false,
            readOnly: true
        };

        await insertChat(user, newChat);

        setChats(chats => {
            setInputChat(getNewChat(chats.length));
            return chats.concat(newChat);
        });

        if (!waitingResponse) {
            socket.emit('requestResponse', user, assistant);
        } else setQueueing(true);

        setRefocus(refocus + 1);

    }, [socket, user, assistant, inputChat, waitingResponse, refocus, setChats, setInputChat]);

    if (loading) return <Loading />;

    return (
        <div className="container">
            <Sidebar userName={user.name} userProfpicSrc={getUserProfpic(user)}>
                1 - Obon Day is...
            </Sidebar>
            <div className="room" ref={parentRef}>
                <ChatHeader parentRef={parentRef}/>
                <ChatFeed asTyping={asTyping} refocus={refocus} handleEnter={handleEnter} />
            </div>
        </div>
    );
}

export default ChatRoom;