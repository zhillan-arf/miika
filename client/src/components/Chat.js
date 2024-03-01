import React, { useState, useRef, useEffect } from "react";

const Chat = ({ onEnter, autoFocus, initialText }) => {
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
            setInputValue('')
        }
    };

    return (
        <input
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type here..."
        />
    );
}
export default Chat;