"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { useChatState } from "@/hooks/useChatState";
import { useRoomMessages, usePrivateMessages } from "@/hooks/useMessages";
import { MessageBubble } from "./MessageBubble";
import { formatDate } from "@/lib/utils";

export const MessageList: React.FC = () => {
  const { currentRoom, currentPrivateChat } = useChatState();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use SWR hooks for data fetching
  const { messages: roomMessages, isLoading: roomLoading } = useRoomMessages(
    currentRoom?.id || null
  );
  const { messages: privateMessages, isLoading: privateLoading } =
    usePrivateMessages(currentPrivateChat?.id || null);

  // Determine which messages to display
  const messages = useMemo(() => {
    return currentRoom
      ? roomMessages
      : currentPrivateChat
      ? privateMessages
      : [];
  }, [currentRoom, roomMessages, currentPrivateChat, privateMessages]);

  const isLoading = currentRoom
    ? roomLoading
    : currentPrivateChat
    ? privateLoading
    : false;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Don't render if no active chat
  if (!currentRoom && !currentPrivateChat) {
    return null;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No messages yet</p>
          <p className="text-sm text-gray-400">
            Be the first to send a message!
          </p>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.created_at);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, typeof messages>);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          {/* Date separator */}
          <div className="flex items-center justify-center my-4">
            <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
              {date}
            </div>
          </div>

          {/* Messages for this date */}
          <div className="space-y-2">
            {dateMessages.map((message, index) => {
              const prevMessage = index > 0 ? dateMessages[index - 1] : null;
              const showAvatar =
                !prevMessage || prevMessage.sender_id !== message.sender_id;

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={false} // This will be determined by comparing with current user
                  showAvatar={showAvatar}
                />
              );
            })}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
