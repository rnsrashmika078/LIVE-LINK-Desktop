/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
"use client";
import { PusherChatState } from "@/types";
import Pusher from "pusher-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";

const PusherContext = createContext<Pusher | null>(null);
export const PusherProvider = ({ children }: { children: ReactNode }) => {
  const authUser = useSelector((store: PusherChatState) => store.chat.authUser);
  const [pusher, setPusher] = useState<Pusher | null>(null);

  useEffect(() => {
    if (!authUser?.uid) return;

    if (!pusher) {
      const instance = new Pusher(import.meta.env.VITE_PUSHER_KEY!, {
        cluster: import.meta.env.VITE_PUSHER_CLUSTER!,
        authEndpoint: `${import.meta.env.VITE_API_URL}/api/pusher/auth`,
        auth: {
          headers: { "X-User-Id": authUser?.uid },
        },
      });
      setPusher(instance);
    }

    return () => pusher?.disconnect();
  }, [authUser?.uid]);

  useEffect(() => {
    return () => {
      pusher?.disconnect();
    };
  }, [pusher]);

  return (
    <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
  );
};
export const usePusher = () => useContext(PusherContext);
