import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import '../assets/dock.css'
import { FaCalendarAlt, FaAddressBook, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

const Dock = ({ masterProfpicSrc }) => {
    const setAuth = useContext(AuthContext);

    const handleSetAuth = () => {
        setAuth(false);
    }

    return (
        <div className="dock">
            <img src={masterProfpicSrc} alt='' style={{width: '24px', height: '24px', marginTop: '1em'}}/>
            <div className='dock-icon'><FaCalendarAlt/></div>
            <div className='dock-icon'><FaAddressBook/></div>
            <div className='dock-icon'><FaClipboardList/></div>
            <div className='dock-icon' onClick={handleSetAuth}><FaSignOutAlt/></div>
        </div>
    );
}

export default Dock;