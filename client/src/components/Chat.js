import React, { useState, useRef, useEffect } from "react";
import "../assets/chat.css";

const Chat = ({ readOnly, onEnter, autoFocus, initialText }) => {
    const [inputValue, setInputValue] = useState(initialText || '');
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onEnter(inputValue);
        }
    }

    return (
        <input
            ref={inputRef}
            className="styled-chatbox"
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder='Type here...'
            readOnly={readOnly}
        />
    );
}
export default Chat;