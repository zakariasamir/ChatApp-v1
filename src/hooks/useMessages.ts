import useSWR, { mutate } from "swr";
import { messagesAPI } from "@/lib/api";
import { Message } from "@/types";

// Fetcher function for room messages
const fetchRoomMessages = async (roomId: string): Promise<Message[]> => {
  return await messagesAPI.getRoomMessages(roomId);
};

// Fetcher function for private messages
const fetchPrivateMessages = async (userId: string): Promise<Message[]> => {
  return await messagesAPI.getPrivateMessages(userId);
};

// Hook for room messages
export const useRoomMessages = (roomId: string | null) => {
  const {
    data,
    error,
    isLoading,
    mutate: mutateMessages,
  } = useSWR(
    roomId ? `room-messages-${roomId}` : null,
    () => (roomId ? fetchRoomMessages(roomId) : null),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    }
  );

  return {
    messages: data || [],
    isLoading,
    error,
    mutate: mutateMessages,
  };
};

// Hook for private messages
export const usePrivateMessages = (userId: string | null) => {
  const {
    data,
    error,
    isLoading,
    mutate: mutateMessages,
  } = useSWR(
    userId ? `private-messages-${userId}` : null,
    () => (userId ? fetchPrivateMessages(userId) : null),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    }
  );

  return {
    messages: data || [],
    isLoading,
    error,
    mutate: mutateMessages,
  };
};

// Hook for sending room messages with optimistic updates
export const useSendRoomMessage = () => {
  const sendMessage = async (roomId: string, content: string) => {
    const message = await messagesAPI.createRoomMessage(roomId, content);

    // Update the cache optimistically
    mutate(
      `room-messages-${roomId}`,
      (currentMessages: Message[] = []) => {
        return [...currentMessages, message];
      },
      false
    );

    return message;
  };

  return { sendMessage };
};

// Hook for sending private messages with optimistic updates
export const useSendPrivateMessage = () => {
  const sendMessage = async (userId: string, content: string) => {
    const message = await messagesAPI.createPrivateMessage(userId, content);

    // Update the cache optimistically
    mutate(
      `private-messages-${userId}`,
      (currentMessages: Message[] = []) => {
        return [...currentMessages, message];
      },
      false
    );

    return message;
  };

  return { sendMessage };
};

// Utility function to add a new message to the cache (for socket events)
export const addMessageToCache = (
  message: Message,
  roomId?: string,
  userId?: string
) => {
  if (roomId) {
    mutate(
      `room-messages-${roomId}`,
      (currentMessages: Message[] = []) => {
        // Check if message already exists to avoid duplicates
        const exists = currentMessages.some((m) => m.id === message.id);
        if (exists) return currentMessages;
        return [...currentMessages, message];
      },
      false
    );
  }

  if (userId) {
    mutate(
      `private-messages-${userId}`,
      (currentMessages: Message[] = []) => {
        // Check if message already exists to avoid duplicates
        const exists = currentMessages.some((m) => m.id === message.id);
        if (exists) return currentMessages;
        return [...currentMessages, message];
      },
      false
    );
  }
};

