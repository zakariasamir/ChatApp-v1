import { useState } from "react";
import { Room, User } from "@/types";

// Simple state management for current room and private chat
export const useChatState = () => {
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

  return {
    currentRoom,
    currentPrivateChat,
    selectRoom,
    selectPrivateChat,
  };
};

