import { ReactNode, Suspense, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import { NewChat } from "@/components/modal/NewChat";
import MessageParent from "./message-area/MessageParent";
import React from "react";

const IncomingCall = React.lazy(() => import("@/components/ui/communications/IncomingCall"))
const MainLayout = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="flex bg-pattern_1 w-full h-screen">
      {/* side nav bar */}
      <Sidebar />
      {/* chat list section */}

      {/* chatting section */}
      <Suspense fallback={<div>{null}</div>}>
        <NewChat />
      </Suspense>
      <div className=" "> </div>
      {children}
      <Suspense fallback={<div>{null}</div>}>
        <IncomingCall />
      </Suspense>
      <MessageParent />
    </div>
  );
};

export default MainLayout;
