"use client";

import React, { useState } from "react";
import {
  Check,
  CheckCheck,
  MoreVertical,
  Reply,
  Copy,
  Trash2,
} from "lucide-react";
import { Message } from "@/modules/_shared/types";
import { useAuth } from "@/modules/_shared/contexts/AuthContext";
import { formatTime, getInitials, cn } from "@/modules/_shared/lib/utils";
import Image from "next/image";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showAvatar = true,
}) => {
  const { user } = useAuth();
  const isOwnMessage = user?.id === message.sender_id;
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setShowMenu(false);
  };

  const handleReply = () => {
    // TODO: Implement reply functionality
    setShowMenu(false);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    setShowMenu(false);
  };

  return (
    <div
      className={cn(
        "flex items-end gap-2 px-2 sm:px-4 py-0.5 group relative",
        isOwnMessage ? "flex-row-reverse" : "flex-row"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMenu(false);
      }}
    >
      {/* Avatar */}
      {showAvatar && !isOwnMessage ? (
        <div className="shrink-0 mb-1">
          {message.sender?.profile_picture ? (
            <div className="relative">
              <Image
                src={message.sender.profile_picture}
                alt={message.sender.username}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-sm"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white dark:ring-slate-700 shadow-sm">
              <span className="text-white text-xs font-semibold">
                {getInitials(message.sender?.username || "U")}
              </span>
            </div>
          )}
        </div>
      ) : (
        !isOwnMessage && <div className="w-8 shrink-0" />
      )}

      {/* Message content container */}
      <div
        className={cn(
          "flex flex-col max-w-[75%] sm:max-w-md lg:max-w-lg relative",
          isOwnMessage ? "items-end" : "items-start"
        )}
      >
        {/* Sender name (only for other users in groups) */}
        {!isOwnMessage && showAvatar && (
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 px-2">
            {message.sender?.username}
          </p>
        )}

        {/* Message bubble with context menu */}
        <div className="relative group/message">
          {/* Context menu button */}
          {isHovered && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 z-10 animate-in fade-in slide-in-from-top-1 duration-150",
                isOwnMessage ? "-left-8" : "-right-8"
              )}
            >
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                aria-label="Message options"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </button>

              {/* Dropdown menu */}
              {showMenu && (
                <div
                  className={cn(
                    "absolute top-8 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-150",
                    isOwnMessage ? "right-0" : "left-0"
                  )}
                >
                  <button
                    onClick={handleReply}
                    className="w-full px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Reply className="h-3.5 w-3.5" />
                    Reply
                  </button>
                  <button
                    onClick={handleCopy}
                    className="w-full px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </button>
                  {isOwnMessage && (
                    <>
                      <div className="my-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                      <button
                        onClick={handleDelete}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Message bubble */}
          <div
            className={cn(
              "relative px-3 py-2 rounded-2xl shadow-sm transition-all duration-200 group-hover/message:shadow-md",
              isOwnMessage
                ? "bg-linear-to-br from-blue-600 to-blue-700 text-white rounded-br-md"
                : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-md border border-slate-200 dark:border-slate-700"
            )}
          >
            {/* Message content */}
            <p className="text-[14px] leading-relaxed whitespace-pre-wrap wrap-break-word">
              {message.content}
            </p>

            {/* Timestamp and status */}
            <div
              className={cn(
                "flex items-center gap-1 mt-1.5",
                isOwnMessage ? "justify-end" : "justify-end"
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-medium select-none",
                  isOwnMessage
                    ? "text-blue-100"
                    : "text-slate-500 dark:text-slate-400"
                )}
              >
                {formatTime(message.createdAt)}
              </span>
              {isOwnMessage && (
                <div
                  className={cn(
                    "transition-colors",
                    message.is_read ? "text-blue-200" : "text-blue-300"
                  )}
                >
                  {message.is_read ? (
                    <CheckCheck className="h-3.5 w-3.5" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </div>
              )}
            </div>

            {/* Message tail */}
            <div
              className={cn(
                "absolute bottom-0 w-3 h-3 transform",
                isOwnMessage ? "right-0 translate-x-1" : "left-0 -translate-x-1"
              )}
            >
              <svg
                viewBox="0 0 8 13"
                className={cn(
                  "absolute bottom-0",
                  isOwnMessage
                    ? "right-0 text-blue-700 dark:text-blue-700"
                    : "left-0 text-white dark:text-slate-800 scale-x-[-1]"
                )}
              >
                <path
                  d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
                  fill="currentColor"
                />
              </svg>
              {!isOwnMessage && (
                <svg
                  viewBox="0 0 8 13"
                  className="absolute bottom-0 left-0 text-slate-200 dark:text-slate-700 scale-x-[-1]"
                  style={{ zIndex: -1 }}
                >
                  <path
                    d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Delivery status text (optional) */}
        {isOwnMessage && message.is_read && (
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Read
          </p>
        )}
      </div>

      {/* Spacer for own messages */}
      {isOwnMessage && <div className="w-8 shrink-0" />}
    </div>
  );
};

export default MessageBubble;
