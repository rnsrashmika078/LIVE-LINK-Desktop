import { ReactNode, Suspense, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import { NewChat } from "@/components/modal/NewChat";
const MainLayout = ({ children }: { children: ReactNode }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <div className="flex bg-pattern_1 w-full h-screen">
            {/* side nav bar */}
            <Sidebar />
            {/* chat list section */}
            {children}

            {/* chatting section */}
            <Suspense fallback={<div>{null}</div>}>
                <NewChat />
            </Suspense>
            <div className=" "> </div>
            {/* chat info section */}
        </div>
    );
};

export default MainLayout;
