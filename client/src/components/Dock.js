import React from "react";
import '../assets/dock.css'
import { FaCalendarAlt, FaAddressBook, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

const Dock = () => {
    return (
        <div className="dock">
            <div className='dock-icon'><FaCalendarAlt/></div>
            <div className='dock-icon'><FaAddressBook/></div>
            <div className='dock-icon'><FaClipboardList/></div>
            <div className='dock-icon'><FaSignOutAlt/></div>
        </div>
    );
}

export default Dock;