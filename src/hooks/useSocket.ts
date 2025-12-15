import { useEffect, useState } from "react";
import { socketService } from "@/lib/socket";
import { User, Message } from "@/types";
import { addMessageToCache } from "./useMessages";

export const useSocket = (isAuthenticated: boolean, user: User | null) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

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
      socket.on("user:online", (userData: User) => {
        setOnlineUsers((prev) => {
          const exists = prev.find((u) => u.id === userData.id);
          if (!exists) {
            return [...prev, userData];
          }
          return prev;
        });
      });

      socket.on("user:offline", (data: { id: string }) => {
        setOnlineUsers((prev) => prev.filter((u) => u.id !== data.id));
      });

      // Message events - integrate with SWR cache
      socket.on("message:room", (message: Message) => {
        // Add message to room cache
        addMessageToCache(message, message.room_id);
      });

      socket.on("message:private", (message: Message) => {
        // For private messages, we need to determine which user's cache to update
        // The message will have sender_id and receiver_id, we need to update both users' caches
        if (message.sender_id === user.id) {
          // Message sent by current user, update receiver's cache
          addMessageToCache(message, undefined, message.receiver_id);
        } else if (message.receiver_id === user.id) {
          // Message received by current user, update sender's cache
          addMessageToCache(message, undefined, message.sender_id);
        }
      });

      // Typing events
      socket.on(
        "typing:start",
        (data: { user: User; roomId?: string; receiverId?: string }) => {
          console.log("User started typing:", data);
        }
      );

      socket.on(
        "typing:stop",
        (data: { user: User; roomId?: string; receiverId?: string }) => {
          console.log("User stopped typing:", data);
        }
      );

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
  }, [isAuthenticated, user]);

  return {
    isConnected,
    onlineUsers,
  };
};

