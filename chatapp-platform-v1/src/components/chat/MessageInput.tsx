"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const {
    currentRoom,
    currentPrivateChat,
    sendMessage,
    sendPrivateMessage,
    startTyping,
    stopTyping,
  } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      if (currentRoom) {
        sendMessage(message.trim());
        stopTyping(currentRoom.id);
      } else if (currentPrivateChat) {
        await sendPrivateMessage(message.trim(), currentPrivateChat.id);
        stopTyping(undefined, currentPrivateChat.id);
      }
      setMessage("");
      setIsTyping(false);

      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Handle typing indicators
    if (currentRoom) {
      if (value.trim() && !isTyping) {
        setIsTyping(true);
        startTyping(currentRoom.id);
      } else if (!value.trim() && isTyping) {
        setIsTyping(false);
        stopTyping(currentRoom.id);
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing
      if (value.trim()) {
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          stopTyping(currentRoom.id);
        }, 1000);
      }
    } else if (currentPrivateChat) {
      if (value.trim() && !isTyping) {
        setIsTyping(true);
        startTyping(undefined, currentPrivateChat.id);
      } else if (!value.trim() && isTyping) {
        setIsTyping(false);
        stopTyping(undefined, currentPrivateChat.id);
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing
      if (value.trim()) {
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          stopTyping(undefined, currentPrivateChat.id);
        }, 1000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  if (!currentRoom && !currentPrivateChat) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 p-4 bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={
              currentRoom
                ? `Message ${currentRoom.name}...`
                : currentPrivateChat
                ? `Message ${currentPrivateChat.username}...`
                : "Type a message..."
            }
            className={cn(
              "w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",
              "min-h-[48px] max-h-32 shadow-sm hover:border-gray-300"
            )}
            rows={1}
          />
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            {message.length > 0 && `${message.length}/1000`}
          </div>
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className={cn(
            "p-3 rounded-xl transition-all transform",
            message.trim()
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
          title="Send message (Enter)"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        Press{" "}
        <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
          Enter
        </kbd>{" "}
        to send,{" "}
        <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
          Shift + Enter
        </kbd>{" "}
        for new line
      </p>
    </div>
  );
};
