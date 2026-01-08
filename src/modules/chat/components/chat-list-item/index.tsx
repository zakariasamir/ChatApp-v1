"use client";

import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, CheckCheck, Pin, Volume2, VolumeX } from "lucide-react";
import { cn, formatTime } from "@/modules/_shared/lib/utils";

interface ChatListItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: string | Date;
  unreadCount?: number;
  isOnline?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  type?: "room" | "user";
  isPinned?: boolean;
  isMuted?: boolean;
  isTyping?: boolean;
  messageStatus?: "sent" | "delivered" | "read";
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline = false,
  isActive = false,
  onClick,
  type = "user",
  isPinned = false,
  isMuted = false,
  isTyping = false,
  messageStatus,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-3 text-left transition-all duration-200 group relative",
        "hover:bg-slate-100 dark:hover:bg-slate-800/50 active:scale-[0.98]",
        isActive &&
          "bg-linear-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-600",
        !isActive && "border-l-4 border-transparent",
        isPinned && "bg-slate-50 dark:bg-slate-800/30"
      )}
    >
      {/* Avatar with status */}
      <div className="relative shrink-0">
        <Avatar
          src={avatar}
          alt={name}
          fallback={name.charAt(0).toUpperCase()}
          size="md"
          showOnline={type === "user"}
          isOnline={isOnline}
          className={cn(
            "transition-transform duration-200 group-hover:scale-105",
            isActive && "ring-2 ring-blue-500 ring-offset-2"
          )}
        />
        {type === "room" && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
            <span className="text-white text-[10px] font-bold">#</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top row - Name and timestamp */}
        <div className="flex items-center justify-between mb-1 gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h3
              className={cn(
                "text-sm font-semibold truncate transition-colors",
                isActive
                  ? "text-blue-700 dark:text-blue-400"
                  : "text-slate-900 dark:text-slate-100",
                unreadCount > 0 && !isActive && "text-slate-900 dark:text-white"
              )}
            >
              {name}
            </h3>
            {isPinned && (
              <Pin className="h-3 w-3 text-slate-500 dark:text-slate-400 shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {timestamp && (
              <span
                className={cn(
                  "text-xs transition-colors",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : unreadCount > 0
                    ? "text-slate-700 dark:text-slate-300 font-medium"
                    : "text-slate-500 dark:text-slate-400"
                )}
              >
                {formatTime(timestamp)}
              </span>
            )}
          </div>
        </div>

        {/* Bottom row - Last message and indicators */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            {/* Message status icon (for sent messages) */}
            {messageStatus && !isTyping && (
              <div
                className={cn(
                  "shrink-0",
                  messageStatus === "read"
                    ? "text-blue-500"
                    : "text-slate-500 dark:text-slate-400"
                )}
              >
                {messageStatus === "read" ? (
                  <CheckCheck className="h-3.5 w-3.5" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </div>
            )}

            {/* Last message or typing indicator */}
            {isTyping ? (
              <div className="flex items-center gap-1">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                  typing
                </span>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></span>
                  <span
                    className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></span>
                  <span
                    className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                </div>
              </div>
            ) : (
              <p
                className={cn(
                  "text-sm truncate transition-colors",
                  unreadCount > 0
                    ? "text-slate-900 dark:text-slate-100 font-medium"
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                {lastMessage || "No messages yet"}
              </p>
            )}
          </div>

          {/* Right indicators */}
          <div className="flex items-center gap-2 shrink-0">
            {isMuted && (
              <VolumeX className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
            )}
            {unreadCount > 0 && (
              <Badge
                variant="default"
                className={cn(
                  "min-w-[20px] h-5 px-1.5 text-xs font-bold",
                  isMuted
                    ? "bg-slate-400 dark:bg-slate-600"
                    : "bg-blue-600 dark:bg-blue-500 shadow-sm"
                )}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Hover indicator */}
      <div
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
          isActive && "opacity-0"
        )}
      >
        <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
      </div>
    </button>
  );
};

export default ChatListItem;
