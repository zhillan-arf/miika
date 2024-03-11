import React from "react";
import Dock from "./Dock";
import '../assets/sidebar.css'

const Sidebar = ({ masterName, children }) => {
    return (
        <div className="sidebar">
            <Dock/>
            <div className="sidebar-bar">
                <header className="master-header">{masterName}'s logs</header>
                <div className="sidebar-days">{children}</div>
            </div>
        </div>
    );
}

export default Sidebar;