import React, { useState, useRef, useEffect } from 'react';
import '../assets/chatbox.css';

const ChatBox = ({ chat, onEnter, masterProfpicSrc, secretaryProfpicSrc, isTypingBox=false }) => {
    const convertToDisplayTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}.${minutes < 10 ? '0' : ''}${minutes}`;
    }
    
    const displayTime = convertToDisplayTime(chat.date);
    const [inputValue, setInputValue] = useState(chat.text || '');
    const inputRef = useRef(null);

    useEffect(() => {
        if (chat.autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chat.autoFocus]);

    const handleInputChange = (e) => {
        setInputValue(e.currentTarget.textContent);
    }

    const autoResizeTextarea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            autoResizeTextarea(e);
            onEnter(inputValue);
        }
    }

    return (
        <div className='chat-box'>
            <img className='chat-profpic' src={(chat.role === 'master') ? masterProfpicSrc : secretaryProfpicSrc} alt='profpic'/>
            <div className='chat-identity'>
                <span className='identity-text'>{chat.userName} 
                    <span className='identity-time'> at {displayTime}</span>
                </span>
            </div>
            <div 
                ref={inputRef}
                className={`chat-text ${isTypingBox? 'chat-text-bold' : ''}`}
                contentEditable={!chat.readOnly}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.currentTarget.textContent !== '') handleKeyDown(e);
                }}
                data-placeholder="Type here..."
                suppressContentEditableWarning={true}
            >
                {inputValue}
            </div>
        </div>
    );
}
export default ChatBox;