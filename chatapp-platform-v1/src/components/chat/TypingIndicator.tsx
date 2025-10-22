"use client";

import React from "react";
import { useChat } from "@/contexts/ChatContext";

export const TypingIndicator: React.FC = () => {
  const { currentRoom } = useChat();

  // For now, we'll show a simple typing indicator
  // In a real app, you'd track typing users from socket events
  const [typingUsers] = React.useState<string[]>([]);

  if (!currentRoom || typingUsers.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-2">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
        <span>
          {typingUsers.length === 1
            ? `${typingUsers[0]} is typing...`
            : `${typingUsers.length} people are typing...`}
        </span>
      </div>
    </div>
  );
};
