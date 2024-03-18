import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();
const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const ServerSocket = ({ children }) => {
  const socket = io(REACT_APP_BACKEND_URI);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);