;

import { useSelector } from "react-redux";
import ChatListPanel from "./ChatListPanel";
import { PusherChatState } from "@/types";
import { useState } from "react";

const ChatListWrapper = () => {
    const activeChat = useSelector(
        (store: PusherChatState) => store.chat.activeChat
    );
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <div
            className={`${
                activeChat?.chatId ? "w-0" : "w-full"
            }  h-screen flex sm:w-auto `}
        >
            <div
                className={` ${
                    activeChat?.chatId ? "w-0 sm:w-full " : "w-full"
                } z-20  h-full relative`}
            >
                {/* make w-0 and remove parent w-full*/}
                <ChatListPanel />
            </div>
        </div>
    );
};

export default ChatListWrapper;
