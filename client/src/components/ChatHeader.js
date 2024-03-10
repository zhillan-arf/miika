import React from "react";
import "../assets/chatheader.css";
import getDate from "../middlewares/getFormatDate.js";

const ChatHeader = () => {
    const displayDate = getDate();
    return (
        <header className="chat-header">
            {displayDate}
        </header>
    )
}

export default ChatHeader;