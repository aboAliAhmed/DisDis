"use client";

import {
    createContext,
    useContext, 
    useEffect, 
    useState
} from "react";

import { io as ClientId } from "socket.io-client"; 

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConected] = useState(false);

    useEffect (() => {
        const socketInstatnce = new (ClientId as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        })

        socketInstatnce.on("connect", () => {
            setIsConected(true);
        });

        socketInstatnce.on("disconnect", () => {
            setIsConected(false);
        });

        setSocket(socketInstatnce);
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}