import React, { createContext, useState, useEffect } from "react";
import { reformatChats } from "../functions/reformatChats.js";
import getNewChat from "../functions/getNewChat.js";

export const DataContext = createContext();

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const DataProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [inputChat, setInputChat] = useState(null);
    const [assistant, setAssistant] = useState(null);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSetData = async () => {
            try {
                const response = await fetch(`${REACT_APP_BACKEND_URI}/api/getchats`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                
                setUser(data.user);
                setAssistant(data.assistant);
                setChats(reformatChats(data.chats));
                setInputChat(getNewChat(data.chats.length));
                setLoading(false);

            } catch (err) {
                console.error(`Error at fetching chats: ${err.message} // ${err.stack}`);
            }
        }
    
        fetchSetData();
    }, []);

    return (
        <DataContext.Provider value={{ user, inputChat, assistant, chats, loading, setChats, setInputChat }}>
            {children}
        </DataContext.Provider>
    )

}