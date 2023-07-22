import { createContext, useContext } from "react";
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3000");

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )

}