"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { ChatArea } from "../chat/ChatArea";

export const ChatLayout: React.FC = () => {
  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-80 shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea />
      </div>
    </div>
  );
};
