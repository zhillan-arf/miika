import React, { createContext, useState, useEffect } from "react";
import { reformatChats } from "../functions/reformatChats.js";
import getNewChat from "../functions/getNewChat.js";

export const DataContext = createContext();

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const DataProvider = ({ children }) => {

    const [master, setMaster] = useState(null);
    const [inputChat, setInputChat] = useState(null);
    const [secretary, setSecretary] = useState(null);
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
                
                setMaster(data.master);
                setSecretary(data.secretary);
                setChats(reformatChats(data.chats));
                setInputChat(getNewChat(data.chats.length, data.master, data.secretary));
                setLoading(false);

            } catch (err) {
                console.error(`Error at fetching chats: ${err}`);
            }
        }
    
        fetchSetData();
    }, []);

    return (
        <DataContext.Provider value={{ master, inputChat, secretary, chats, loading, setChats, setInputChat }}>
            {children}
        </DataContext.Provider>
    )

}