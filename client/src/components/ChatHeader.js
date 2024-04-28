import React, {useState, useRef, useEffect} from 'react';
import "../assets/chatheader.css";
import { getFormatDate } from "../functions/getFormatDate.js";

const ChatHeader = ({ parentRef }) => {
    const displayDate = getFormatDate();
    const selfRef = useRef(null);
    const [selfWidth, setSelfWidth] = useState(0);

    const updateSelfWidth = () => {
        if (parentRef.current) {
            setSelfWidth(parentRef.current.offsetWidth);
        }
    }

    useEffect(() => {
        updateSelfWidth();
        window.addEventListener('resize', updateSelfWidth);
        return () => {
            window.removeEventListener('resize', updateSelfWidth);
        }
    });

    return (
        <header ref={selfRef} className="chat-header" style={{width: selfWidth}}>
            <div className="date">{displayDate}</div>
        </header>
    );
}

export default ChatHeader;