import React from "react";
import Dock from "./Dock";
import '../assets/sidebar.css'

const Sidebar = ({ userName, userProfpicSrc, children }) => {
    return (
        <div className="sidebar">
            <Dock userProfpicSrc={userProfpicSrc}/>
            <div className="sidebar-bar">
                <header className="user-header">{userName}'s logs</header>
                <div className="sidebar-days">{children}</div>
            </div>
        </div>
    );
}

export default Sidebar;