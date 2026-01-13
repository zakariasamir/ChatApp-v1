"use client";

import React, { useState, useMemo } from "react";
import {
  MoreVertical,
  MessageSquarePlus,
  Users,
  Search,
  LogOut,
  Settings,
  Moon,
  Sun,
  Bell,
} from "lucide-react";
import { useAuth } from "@/modules/_shared/contexts/AuthContext";
import { useChatState } from "@/modules/_shared/hooks/useChatState";
import API from "@/router/index";
import { socketService } from "@/modules/_shared/lib/socket";
import { Room, User, Message } from "@/modules/_shared/types";
import { Avatar } from "@/components/ui/avatar";
import SearchBar from "../search-bar";
import { ChatListItem } from "@/modules/chat/components";
import { CreateRoomModal } from "@/modules/chat/components";

const Sidebar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { rooms } = API.v1.rooms.useFindAll();
  const { isConnected, onlineUsers } = API.v1.socket.useSocket(
    isAuthenticated,
    user
  );
  const { currentRoom, currentPrivateChat, selectRoom, selectPrivateChat } =
    useChatState();
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "rooms" | "direct">("all");

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

  // Combine rooms and users into a single chat list
  const chatList = useMemo(() => {
    const roomChats =
      rooms?.data?.docs?.map((room: Room) => ({
        id: room.id,
        name: room.name,
        avatar: undefined,
        lastMessage: "",
        timestamp: room.updated_at || room.created_at,
        unreadCount: 0,
        isOnline: false,
        isActive: currentRoom?.id === room.id,
        onClick: () => handleRoomSelect(room),
        type: "room" as const,
      })) || [];

    const userChats = onlineUsers
      .filter((u) => u.id !== user?.id)
      .map((u) => ({
        id: u.id,
        name: u.username,
        avatar: u.profile_picture,
        lastMessage: "",
        timestamp: new Date(),
        unreadCount: 0,
        isOnline: true,
        isActive: currentPrivateChat?.id === u.id,
        onClick: () => selectPrivateChat(u),
        type: "user" as const,
      }));

    let allChats = [...roomChats, ...userChats];

    // Filter by tab
    if (activeTab === "rooms") {
      allChats = allChats.filter((chat) => chat.type === "room");
    } else if (activeTab === "direct") {
      allChats = allChats.filter((chat) => chat.type === "user");
    }

    // Filter by search query
    if (searchQuery.trim()) {
      return allChats.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allChats;
  }, [
    rooms,
    onlineUsers,
    user,
    currentRoom,
    currentPrivateChat,
    searchQuery,
    activeTab,
    handleRoomSelect,
    selectPrivateChat,
  ]);

  return (
    <div className="flex flex-col h-full bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-r border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative">
              <Avatar
                src={user?.profile_picture}
                alt={user?.username || "User"}
                fallback={user?.username?.charAt(0).toUpperCase() || "U"}
                size="md"
                className="ring-2 ring-white/30"
              />
              {isConnected && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-base truncate">
                {user?.username || "User"}
              </h2>
              <p className="text-blue-100 text-xs truncate flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isConnected ? "bg-green-400" : "bg-gray-400"
                  }`}
                ></span>
                {isConnected ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCreateRoom(true)}
              className="p-2.5 text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
              title="New chat"
            >
              <MessageSquarePlus className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2.5 text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
                title="Menu"
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                      <Bell className="h-4 w-4" />
                      Notifications
                    </button>
                    <div className="my-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
          {[
            { id: "all", label: "All" },
            { id: "rooms", label: "Rooms" },
            { id: "direct", label: "Direct" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 py-3 bg-white dark:bg-slate-900">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search conversations..."
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {chatList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <Search className="h-9 w-9 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {searchQuery ? "No chats found" : "No conversations yet"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              {searchQuery
                ? "Try searching with different keywords"
                : "Start a new conversation or create a room"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateRoom(true)}
                className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm hover:shadow-md"
              >
                Start chatting
              </button>
            )}
          </div>
        ) : (
          <div className="py-1">
            {chatList.map((chat, index) => (
              <div
                key={chat.id}
                className="animate-in fade-in slide-in-from-left-2"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <ChatListItem {...chat} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Online Users Count */}
      <div className="px-4 py-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Users className="h-4 w-4" />
          <span className="font-medium">{onlineUsers.length}</span>
          <span>online</span>
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateRoom && (
        <CreateRoomModal onClose={() => setShowCreateRoom(false)} />
      )}
    </div>
  );
};

export default Sidebar;
