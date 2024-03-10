import React, { useState, useRef, useEffect } from 'react';
import '../assets/chatbox.css';

const ChatBox = ({ displayTime, userName, readOnly, onEnter, autoFocus, initialText }) => {
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

    const profpicSrc = 'assets/images/master.png';

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