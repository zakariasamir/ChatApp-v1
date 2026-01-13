"use client";

import React, { useState } from "react";
import {
  Circle,
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";
import { User } from "@/modules/_shared/types";
import { cn, getInitials } from "@/modules/_shared/lib/utils";
import Image from "next/image";

interface UserItemProps {
  user: User;
  isOnline: boolean;
  onClick?: () => void;
  showActions?: boolean;
  lastSeen?: Date | string;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  isOnline,
  onClick,
  showActions = false,
  lastSeen,
}) => {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const getLastSeenText = () => {
    if (isOnline) return "Active now";
    if (!lastSeen) return "Offline";

    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffMs = now.getTime() - lastSeenDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return "Last week";
  };

  return (
    <div
      className="w-full group relative"
      onMouseEnter={() => showActions && setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      <button
        onClick={onClick}
        className={cn(
          "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
          "hover:bg-slate-100 dark:hover:bg-slate-800/50 active:scale-[0.98]",
          "group-hover:shadow-sm"
        )}
      >
        {/* Avatar with status */}
        <div className="relative shrink-0">
          {user.profile_picture ? (
            <div className="relative">
              <Image
                src={user.profile_picture}
                alt={user.username}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 transition-transform duration-200 group-hover:scale-105"
              />
              {/* Online status ring animation */}
              {isOnline && (
                <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-75"></div>
              )}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-lg transition-transform duration-200 group-hover:scale-105">
              <span className="text-white font-bold text-base">
                {getInitials(user.username)}
              </span>
            </div>
          )}

          {/* Status indicator dot */}
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm transition-all duration-200",
              isOnline
                ? "bg-green-500 group-hover:scale-110"
                : "bg-slate-400 dark:bg-slate-600"
            )}
          >
            {isOnline && (
              <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse"></div>
            )}
          </div>
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {user.username}
            </p>
            {user.email && (
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[100px]">
                @{user.email.split("@")[0]}
              </span>
            )}
          </div>

          {/* Status text */}
          <div className="flex items-center gap-1.5">
            <Circle
              className={cn(
                "h-2 w-2 fill-current transition-colors",
                isOnline
                  ? "text-green-500 animate-pulse"
                  : "text-slate-400 dark:text-slate-600"
              )}
            />
            <p
              className={cn(
                "text-xs font-medium transition-colors",
                isOnline
                  ? "text-green-600 dark:text-green-400"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              {getLastSeenText()}
            </p>
          </div>
        </div>

        {/* Quick actions on hover */}
        {showActions && showQuickActions && (
          <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Start message
              }}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 hover:scale-110"
              title="Send message"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Start call
              }}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200 hover:scale-110"
              title="Voice call"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Start video call
              }}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-all duration-200 hover:scale-110"
              title="Video call"
            >
              <Video className="h-4 w-4" />
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default UserItem;
