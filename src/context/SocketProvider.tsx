import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import {SOCKET_URL} from '@env'

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const socket = io(SOCKET_URL);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
