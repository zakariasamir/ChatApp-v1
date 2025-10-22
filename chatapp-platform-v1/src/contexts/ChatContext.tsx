"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { User, Room, Message, ChatContextType } from "@/types";
import { useAuth } from "./AuthContext";
import { socketService } from "@/lib/socket";
import { roomsAPI, messagesAPI } from "@/lib/api";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentPrivateChat, setCurrentPrivateChat] = useState<User | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const socket = socketService.connect();
      setIsConnected(socketService.getConnectionStatus());

      // Socket event listeners
      const handleConnect = () => setIsConnected(true);
      const handleDisconnect = () => setIsConnected(false);

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      // User events
      socket.on("user:online", (userData) => {
        setOnlineUsers((prev) => {
          const exists = prev.find((u) => u.id === userData.id);
          if (!exists) {
            return [...prev, userData];
          }
          return prev;
        });
      });

      socket.on("user:offline", (data) => {
        setOnlineUsers((prev) => prev.filter((u) => u.id !== data.id));
      });

      // Message events
      socket.on("message:room", (message) => {
        if (currentRoom && message.room_id === currentRoom.id) {
          setMessages((prev) => [...prev, message]);
        }
      });

      socket.on("message:private", (message) => {
        // Handle private messages
        setMessages((prev) => [...prev, message]);
      });

      // Typing events
      socket.on("typing:start", (data) => {
        // Handle typing start - could be implemented later
        console.log("User started typing:", data);
      });

      socket.on("typing:stop", (data) => {
        // Handle typing stop - could be implemented later
        console.log("User stopped typing:", data);
      });

      // Load rooms
      loadRooms();

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
        socket.off("user:online");
        socket.off("user:offline");
        socket.off("message:room");
        socket.off("message:private");
        socket.off("typing:start");
        socket.off("typing:stop");
      };
    } else {
      socketService.disconnect();
      setIsConnected(false);
    }
  }, [isAuthenticated, user, currentRoom]);

  // Load rooms
  const loadRooms = async () => {
    try {
      const roomsData = await roomsAPI.getAllRooms();
      // Ensure roomsData is always an array
      setRooms(Array.isArray(roomsData) ? roomsData : []);
    } catch (error) {
      console.error("Failed to load rooms:", error);
      setRooms([]); // Set empty array on error
    }
  };

  const loadMessages = useCallback(async () => {
    if (!currentRoom) return;

    try {
      const messagesData = await messagesAPI.getRoomMessages(currentRoom.id);
      setMessages(messagesData);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  }, [currentRoom]);

  // Expose loadRooms function
  const refreshRooms = loadRooms;

  // Load messages for current room
  useEffect(() => {
    if (currentRoom) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [currentRoom, loadMessages]);

  const sendMessage = (content: string) => {
    if (!currentRoom || !content.trim()) return;

    socketService.sendRoomMessage(currentRoom.id, content.trim());
  };

  const joinRoom = (roomId: string) => {
    socketService.joinRoom(roomId);
  };

  const leaveRoom = (roomId: string) => {
    socketService.leaveRoom(roomId);
  };

  const startTyping = (roomId?: string, receiverId?: string) => {
    socketService.startTyping(roomId, receiverId);
  };

  const stopTyping = (roomId?: string, receiverId?: string) => {
    socketService.stopTyping(roomId, receiverId);
  };

  // Private chat functions
  const startPrivateChat = async (targetUser: User) => {
    try {
      setCurrentPrivateChat(targetUser);
      setCurrentRoom(null); // Clear room selection
      await loadPrivateMessages(targetUser.id);
    } catch (error) {
      console.error("Failed to start private chat:", error);
    }
  };

  const loadPrivateMessages = async (userId: string) => {
    try {
      const messages = await messagesAPI.getPrivateMessages(userId);
      setMessages(messages);
    } catch (error) {
      console.error("Failed to load private messages:", error);
      setMessages([]);
    }
  };

  const sendPrivateMessage = async (content: string, targetUserId: string) => {
    try {
      const message = await messagesAPI.createPrivateMessage(
        targetUserId,
        content
      );
      setMessages((prev) => [...prev, message]);
      return message;
    } catch (error) {
      console.error("Failed to send private message:", error);
      throw error;
    }
  };

  const value: ChatContextType = {
    user,
    rooms,
    currentRoom,
    currentPrivateChat,
    messages,
    onlineUsers,
    isConnected,
    setCurrentRoom,
    sendMessage,
    joinRoom,
    leaveRoom,
    startTyping,
    stopTyping,
    refreshRooms,
    startPrivateChat,
    sendPrivateMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
