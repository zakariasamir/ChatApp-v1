"use client";

import React from "react";
import { MessageSquare, Lock, Hash } from "lucide-react";
import { Room } from "@/types";
import { cn } from "@/lib/utils";

interface RoomItemProps {
  room: Room;
  isActive: boolean;
  onClick: () => void;
}

export const RoomItem: React.FC<RoomItemProps> = ({
  room,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all group",
        isActive
          ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm"
          : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
          isActive
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600"
        )}
      >
        {room.is_private ? (
          <Lock className="h-5 w-5" />
        ) : (
          <Hash className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p
            className={cn(
              "text-sm font-semibold truncate",
              isActive ? "text-blue-900" : "text-gray-900"
            )}
          >
            {room.name}
          </p>
          {room.is_private && (
            <Lock
              className={cn(
                "h-3 w-3 shrink-0 ml-2",
                isActive ? "text-blue-600" : "text-gray-400"
              )}
            />
          )}
        </div>
        {room.description && (
          <p
            className={cn(
              "text-xs truncate mt-0.5",
              isActive ? "text-blue-600" : "text-gray-500"
            )}
          >
            {room.description}
          </p>
        )}
      </div>
    </button>
  );
};
