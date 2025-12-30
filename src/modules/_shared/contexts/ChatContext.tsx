"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Room, User } from "@/modules/_shared/types";

interface ChatContextType {
  currentRoom: Room | null;
  currentPrivateChat: User | null;
  selectRoom: (room: Room | null) => void;
  selectPrivateChat: (user: User | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentPrivateChat, setCurrentPrivateChat] = useState<User | null>(
    null
  );

  const selectRoom = (room: Room | null) => {
    setCurrentRoom(room);
    setCurrentPrivateChat(null); // Clear private chat when selecting room
  };

  const selectPrivateChat = (user: User | null) => {
    setCurrentPrivateChat(user);
    setCurrentRoom(null); // Clear room when selecting private chat
  };

  return (
    <ChatContext.Provider
      value={{
        currentRoom,
        currentPrivateChat,
        selectRoom,
        selectPrivateChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatState must be used within a ChatProvider");
  }
  return context;
};
