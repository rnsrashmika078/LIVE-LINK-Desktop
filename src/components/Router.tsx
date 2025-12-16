import App from "@/app";
import ChatPanel from "@/pages/chat/ChatPanel";
import Main from "@/pages/Main";
import Welcome from "@/pages/welcome/Welcome";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Welcome /> },
            {
                path: "app",
                element: <Main />,
                children: [
                    { index: true, element: <ChatPanel /> },
                    // { path: "/connection", element: < /> },
                    // { path: "chats", element:  },
                ],
            },
        ],
    },
]);
