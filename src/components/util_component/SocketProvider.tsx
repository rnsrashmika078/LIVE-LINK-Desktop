/* eslint-disable react-hooks/set-state-in-effect */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { PusherChatState } from "@/types";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const authUser = useSelector((store: PusherChatState) => store.chat.authUser);

  const path = import.meta.env.VITE_API_URL!;


  // Connect socket once authUser.uid is available
  useEffect(() => {
    if (!authUser?.uid) return;

    const socketInstance = io(path, {
      path: "/api/socket", 
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => {
      socketInstance.emit("join-room", authUser.uid);
    });

    socketInstance.on("room-joined", (data) => {
      console.log("success");
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      socketInstance.off();
    };
  }, [authUser?.uid]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
