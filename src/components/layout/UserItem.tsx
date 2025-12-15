"use client";

import React from "react";
import { Circle } from "lucide-react";
import { User } from "@/types";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

interface UserItemProps {
  user: User;
  isOnline: boolean;
  onClick?: () => void;
}

export const UserItem: React.FC<UserItemProps> = ({
  user,
  isOnline,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="relative shrink-0">
        {user.profile_picture ? (
          <Image
            src={user.profile_picture}
            alt={user.username}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {getInitials(user.username)}
            </span>
          </div>
        )}
        <div
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white",
            isOnline ? "bg-green-500" : "bg-gray-400"
          )}
        />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
          {user.username}
        </p>
        <div className="flex items-center space-x-1">
          <Circle
            className={cn(
              "h-2 w-2 fill-current",
              isOnline ? "text-green-500" : "text-gray-400"
            )}
          />
          <p className="text-xs text-gray-500">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </button>
  );
};
