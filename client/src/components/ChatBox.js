import React, { useState, useRef, useEffect, useContext } from 'react';
import { DataContext } from '../hooks/DataProvider';
import '../assets/chatbox.css';

const getDisplayTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}.${minutes < 10 ? '0' : ''}${minutes}`;
}

const ChatBox = ({ chat, onEnter, userProfpicSrc, assistantProfpicSrc, isTypingBox=false, refocus }) => {
    const [text, setText] = useState(chat.text || '');
    const textRef = useRef(null);
    const { user, assistant } = useContext(DataContext);

    useEffect(() => {
        setText(chat.content || '');
    }, [chat]);

    useEffect(() => {
        if (chat.autoFocus && textRef.current && !isTypingBox) {
            textRef.current.focus();
            textRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [chat, chat.autoFocus, isTypingBox, refocus]);

    const autoResizeTextarea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && text !== '') {
            e.preventDefault();
            autoResizeTextarea(e);
            setText(e.target.value);
            if (!isTypingBox) onEnter(text);
        }
    }

    const handleChange = (e) => {
        setText(e.target.value);
        autoResizeTextarea(e);
    };

    return (
        <div className='chat-box'>
            <img className='chat-profpic' src={(chat.role === 'user') ? userProfpicSrc : assistantProfpicSrc} alt='profpic'/>
            <div className='chat-identity'>
                <span className='identity-text'>
                    {chat.role === 'user' ? user.name : assistant.name}
                    <span className='identity-time'> at {getDisplayTime(chat.date)}</span>
                </span>
            </div>
            <textarea
                ref={textRef}
                id='chat-text'
                className={`chat-text ${isTypingBox ? 'chat-text-italic' : ''}`}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type here..."
                readOnly={chat.readOnly}
            />
        </div>
    );
}
export default ChatBox;