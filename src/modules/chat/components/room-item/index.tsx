"use client";

import React from "react";
import {
  Lock,
  Hash,
  Users,
  Pin,
  Bell,
  BellOff,
  MoreVertical,
} from "lucide-react";
import { Room } from "@/modules/_shared/types";
import { cn } from "@/modules/_shared/lib/utils";

interface RoomItemProps {
  room: Room;
  isActive: boolean;
  onClick: () => void;
  unreadCount?: number;
  isPinned?: boolean;
  isMuted?: boolean;
  onlineCount?: number;
}

const RoomItem: React.FC<RoomItemProps> = ({
  room,
  isActive,
  onClick,
  unreadCount = 0,
  isPinned = false,
  isMuted = false,
  onlineCount = 0,
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
      {/* Room Icon */}
      <div
        className={cn(
          "shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 relative",
          "group-hover:scale-105",
          isActive
            ? "bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-600 dark:text-slate-400 group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900/30 dark:group-hover:to-blue-800/30 group-hover:text-blue-600 dark:group-hover:text-blue-400"
        )}
      >
        {room.is_private ? (
          <Lock className="h-5 w-5" />
        ) : (
          <Hash className="h-6 w-6 font-bold" />
        )}

        {/* Active indicator dot */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
        )}
      </div>

      {/* Room Info */}
      <div className="flex-1 min-w-0">
        {/* Top row - Name and metadata */}
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
              {room.name}
            </h3>
            {isPinned && (
              <Pin className="h-3 w-3 text-slate-500 dark:text-slate-400 shrink-0" />
            )}
            {room.is_private && (
              <div className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded text-[10px] font-semibold">
                PRIVATE
              </div>
            )}
          </div>

          {/* Right indicators */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isMuted && (
              <BellOff className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
            )}
            {unreadCount > 0 && (
              <div
                className={cn(
                  "min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-xs font-bold",
                  isMuted
                    ? "bg-slate-400 dark:bg-slate-600 text-white"
                    : "bg-blue-600 dark:bg-blue-500 text-white shadow-sm"
                )}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </div>
            )}
          </div>
        </div>

        {/* Bottom row - Description or member count */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {room.description ? (
              <p
                className={cn(
                  "text-xs truncate transition-colors",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                {room.description}
              </p>
            ) : (
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {room.members?.length || 0} members
                </span>
                {onlineCount > 0 && (
                  <>
                    <span className="text-slate-400 dark:text-slate-500">
                      •
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      {onlineCount} online
                    </span>
                  </>
                )}
              </div>
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

export default RoomItem;
