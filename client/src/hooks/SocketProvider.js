import React, { createContext, useState, useCallback, useEffect } from "react"
import io from 'socket.io-client';

export const SocketContext = createContext();

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);

    const connectSocket = useCallback(() => {
        if (!socket || !socket.connected) {
            const newSocket = io(REACT_APP_BACKEND_URI, { 
                'transports': ['websocket'] 
            });
    
            newSocket.on('connect', () => {
                setSocket(newSocket);
            });
    
            newSocket.on('connect_error', (err) => {
                console.error('Socket error:', err);
                setTimeout(connectSocket, 5000);
            });
    
            newSocket.on('disconnect', (reason) => {
                if (reason === 'io server disconnect') {
                    setTimeout(connectSocket, 5000);
                }
            });
    
            return newSocket;
        }
    }, [socket]);

    useEffect(() => {
        const newSocket = connectSocket();

        return () => {
            if (newSocket && newSocket.connected) {
                newSocket.disconnect();
            }
        }
    }, [connectSocket]);

    return (
        <SocketContext.Provider value={{socket}}>
            { children }
        </SocketContext.Provider>
    )
}