"use client";

import React from "react";
import { Check, CheckCheck } from "lucide-react";
import { Message } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { formatTime, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showAvatar = true,
}) => {
  const { user } = useAuth();
  const isOwnMessage = user?.id === message.sender_id;

  return (
    <div
      className={cn(
        "flex items-end space-x-2 group animate-fadeIn",
        isOwnMessage ? "flex-row-reverse space-x-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      {showAvatar && !isOwnMessage && (
        <div className="shrink-0">
          {message.sender?.profile_picture ? (
            <Image
              src={message.sender.profile_picture}
              alt={message.sender.username}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white shadow-sm">
              <span className="text-white text-xs font-semibold">
                {getInitials(message.sender?.username || "U")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Message content */}
      <div
        className={cn(
          "flex flex-col max-w-xs lg:max-w-md",
          isOwnMessage ? "items-end" : "items-start"
        )}
      >
        {/* Sender name (only for other users) */}
        {!isOwnMessage && showAvatar && (
          <p className="text-xs font-medium text-gray-600 mb-1 px-1">
            {message.sender?.username}
          </p>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            "relative px-4 py-2.5 rounded-2xl shadow-sm transition-all group-hover:shadow-md",
            isOwnMessage
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-sm"
              : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Timestamp and status */}
        <div
          className={cn(
            "flex items-center space-x-1 mt-1 px-1",
            isOwnMessage ? "flex-row-reverse space-x-reverse" : "flex-row"
          )}
        >
          <p className="text-xs text-gray-500">
            {formatTime(message.created_at)}
          </p>
          {isOwnMessage && (
            <div className="text-blue-500">
              {message.is_read ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Spacer for own messages */}
      {isOwnMessage && showAvatar && <div className="w-8" />}
    </div>
  );
};
