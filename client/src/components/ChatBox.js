import React, { useState, useRef, useEffect } from 'react';
import '../assets/chatbox.css';

const ChatBox = ({ userName, date, readOnly, onEnter, autoFocus, initialText }) => {
    const convertToDisplayTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}.${minutes < 10 ? '0' : ''}${minutes}`;
    }
    
    const displayTime = useState(convertToDisplayTime(date));
    const [inputValue, setInputValue] = useState(initialText || '');
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

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

    const masterProfpicSrc = 'assets/images/master.png';
    const profpicSrc = masterProfpicSrc;

    return (
        <div className='chat-box'>
            <img className='chat-profpic' src={profpicSrc} alt='profpic'/>
            <div className='chat-identity'>
                <span className='identity-text'>{userName} <span className='identity-time'>at {displayTime}</span></span>
            </div>
            <div 
                ref={inputRef}
                className='chat-text' 
                contentEditable={!readOnly}
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