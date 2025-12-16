/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import React from "react";
import { ChatsType, PusherChatDispatch, PusherChatState } from "@/types";
import { useLiveLink } from "@/context/LiveLinkContext";
import { useGetChats } from "@/lib/tanstack/chatsQuery";
import { setActiveChat, setChats } from "@/lib/redux/chatslicer";
import {
    useUnreadCountClear,
    useUnreadCountIncrease,
    useUpdateMessageSeenInChat,
} from "@/hooks/useEffectHooks";
import { BiEdit, BiFilter } from "react-icons/bi";
import SearchArea from "@/components/ui/searcharea";
import { UserChatCard } from "@/components/ui/cards";
import { UserDetails } from "@/components/modal/NewChat";
import { useDeleteMessage } from "@/hooks/CommonEffectHooks";

const ChatPanel = React.memo(() => {
    //use states
    // const [openModal, setOpenModal] = useState<boolean>(false);
    const [chatState, setChatState] = useState<ChatsType[]>([]);
    // const [isPending, setIsPending] = useState(
    //   initialChats.length === 0  ? f
    // );

    //use hooks
    const { openModal, setOpenModal, connectionState } = useLiveLink();

    //redux states
    const states = useSelector(
        (store: PusherChatState) => ({
            authUser: store.chat.authUser,
            activeChat: store.chat.activeChat,
            chatsArray: store.chat.chatArray,
            messageSeen: store.chat.messageSeen,
            liveMessagesArray: store.chat.messagesArray,
            currentTab: store.layout.currentTab,
            debounce: store.chat.debouncedText,
            unreads: store.chat.unreads,
            deletedMessages: store.chat.deletedMessage,
        }),
        shallowEqual
    );

    //redux dispatcher
    const dispatch = useDispatch<PusherChatDispatch>();

    // get Chats ( tanstack )
    const { data, refetch } = useGetChats(states.authUser?.uid ?? "", true);
    const msg = useMemo(
        () => states.liveMessagesArray.at(-1),
        [states.liveMessagesArray]
    );


    //use Effect: add chats to the react state for global access ( initially )
    useEffect(() => {
        if (data?.chats.length === 0) return;

        if (Array.isArray(data?.chats)) {
            dispatch(setChats(data.chats));
            setChatState(data?.chats);
        }
    }, [data?.chats]);

    //Use Effect: for revalidate the data ( refetch ) when chats change for the new Chats
    useEffect(() => {
        if (!!states.chatsArray?.length) {
            setChatState(states.chatsArray);
            const wait = (ms: number) =>
                new Promise((res) => setTimeout(res, ms));
            wait(200);
            refetch();
        }
    }, [states.chatsArray?.length, refetch, states.chatsArray]);

    // update the ( increase ) the unread message count
    // update the chat states to latest message data coming from live socket ( pusher )
    useUnreadCountIncrease(
        msg!,
        setChatState,
        states.activeChat!,
        states.authUser!
    );

    //clear count
    useUnreadCountClear(setChatState, states.activeChat!, states.authUser!);

    // //stop update ( increase ) unread message if current chat is open
    // useUnreadCountStop(msg!, setChatState, states.activeChat!);

    //update message seen status ( in this case last messagee status of chat)
    // update the chat states to latest message data coming from live socket ( pusher )
    useUpdateMessageSeenInChat(setChatState, states.messageSeen!);

    //update delete message from the message
    useDeleteMessage("Chat", states.deletedMessages!, setChatState);

    //here get the shallow copy from the chatState -> object are same but the array is change ( new array )
    //new array = new memory address -> but the object inside the array referencing to the same memory address of previous

    const chats = useMemo(
        () =>
            [...chatState].sort((a, b) => {
                const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;

                return bTime - aTime;
            }),

        [chatState]
    );

    // console.log("filtered Chats", chats);

    return (
        <div
            className={`z-50 transition-all bg-pattern_2 h-full w-full sm:w-90  custom-scrollbar-y `}
        >
            <div>{states.authUser?.createdAt}</div>
            <div className=" space-y-2 relative ">
                <div className=" p-5 justify-center items-center  sticky top-0 space-y-2  bg-pattern_2">
                    <div className=" flex justify-between items-center ">
                        <h1 className="header">Chats</h1>
                        <div className="flex gap-4 ">
                            <BiEdit
                                onClick={() => setOpenModal(!openModal)}
                                size={30}
                                className="hover:bg-pattern_5 p-1 rounded-md"
                            />
                            <BiFilter
                                size={30}
                                className="hover:bg-pattern_5 p-1 rounded-md"
                            />
                        </div>
                    </div>
                    <SearchArea placeholder="Search or start a new chat" />
                </div>
                {/* <Spinner condition={isPending} /> */}

                <div className="px-5 flex w-full flex-col justify-start items-center">
                    {chats && chats.length > 0 ? (
                        chats.map((chat: ChatsType, i: number) => {
                            return (
                                <UserChatCard
                                    key={chat.chatId}
                                    chat={chat}
                                    handleClick={() =>
                                        dispatch(setActiveChat(chat))
                                    }
                                />
                            );
                        })
                    ) : (
                        <div>No Chats</div>
                    )}
                </div>
            </div>
            {states.currentTab === "users" && <UserDetails />}
        </div>
    );
});

ChatPanel.displayName = "ChatPanel";
export default ChatPanel;
