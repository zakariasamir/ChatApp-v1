"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  Plus,
  LogOut,
  Settings,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useChatState } from "@/hooks/useChatState";
import { useRooms } from "@/hooks/useRooms";
import { useSocket } from "@/hooks/useSocket";
import { socketService } from "@/lib/socket";
import { Room, User } from "@/types";
import { RoomItem } from "./RoomItem";
import { UserItem } from "./UserItem";
import { CreateRoomModal } from "@/components/layout/CreateRoomModal";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

type TabType = "rooms" | "users";

export const Sidebar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { rooms } = useRooms();
  const { isConnected, onlineUsers } = useSocket(isAuthenticated, user);
  const { currentRoom, selectRoom, selectPrivateChat } = useChatState();
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("rooms");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleRoomSelect = (room: Room) => {
    selectRoom(room);
    socketService.joinRoom(room.id);
  };

  const handlePrivateChat = (user: User) => {
    selectPrivateChat(user);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">ChatApp</h1>
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                isConnected ? "bg-green-500" : "bg-red-500"
              )}
            />
            {isConnected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {user?.profile_picture ? (
              <Image
                src={user.profile_picture}
                alt={user.username}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {getInitials(user?.username || "U")}
                </span>
              </div>
            )}
            <div
              className={cn(
                "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                user?.is_online ? "bg-green-500" : "bg-gray-400"
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.username}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={handleLogout}
              className="p-1 text-gray-400 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("rooms")}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === "rooms"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Rooms</span>
            {rooms.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                {rooms.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === "users"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <Users className="h-4 w-4" />
            <span>Users</span>
            {onlineUsers.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                {onlineUsers.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "rooms" ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-900">All Rooms</h2>
              <button
                onClick={() => setShowCreateRoom(true)}
                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Create new room"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1">
              {rooms.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    No rooms yet
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Create your first room to start chatting
                  </p>
                  <button
                    onClick={() => setShowCreateRoom(true)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create Room
                  </button>
                </div>
              ) : (
                rooms.map((room) => (
                  <RoomItem
                    key={room.id}
                    room={room}
                    isActive={currentRoom?.id === room.id}
                    onClick={() => handleRoomSelect(room)}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-900">
                Online Users
              </h2>
              <span className="text-xs text-gray-500">
                {onlineUsers.length} online
              </span>
            </div>

            <div className="space-y-1">
              {onlineUsers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    No users online
                  </p>
                  <p className="text-xs text-gray-500">
                    Users will appear here when they come online
                  </p>
                </div>
              ) : (
                <>
                  {onlineUsers
                    .filter((u) => u.id !== user?.id)
                    .map((u) => (
                      <UserItem
                        key={u.id}
                        user={u}
                        isOnline={true}
                        onClick={() => handlePrivateChat(u)}
                      />
                    ))}
                  {onlineUsers.filter((u) => u.id !== user?.id).length ===
                    0 && (
                    <div className="text-center py-8 text-sm text-gray-500">
                      You are the only user online
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {showCreateRoom && (
        <CreateRoomModal onClose={() => setShowCreateRoom(false)} />
      )}
    </div>
  );
};
