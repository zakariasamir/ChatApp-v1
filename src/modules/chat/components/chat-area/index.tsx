// "use client";

// import React from "react";
// import { MoreVertical, Video, Phone, ArrowLeft } from "lucide-react";
// import { useChatState } from "@/modules/_shared/hooks/useChatState";
// import {
//   MessageList,
//   MessageInput,
//   TypingIndicator,
// } from "@/modules/chat/components";
// import { Avatar } from "@/components/ui/avatar";
// import { cn } from "@/modules/_shared/lib/utils";

// const ChatArea: React.FC = () => {
//   const { currentRoom, currentPrivateChat } = useChatState();

//   if (!currentRoom && !currentPrivateChat) {
//     return (
//       <div className="flex-1 flex items-center justify-center bg-[#E5DDD5]">
//         <div className="text-center max-w-md px-6">
//           <div className="w-24 h-24 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//             <span className="text-white text-4xl">💬</span>
//           </div>
//           <p className="text-[#667781] text-sm">
//             Select a chat from the sidebar to start messaging
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const chatName = currentRoom?.name || currentPrivateChat?.username || "";
//   const chatAvatar = currentPrivateChat?.profile_picture;
//   const isOnline = currentPrivateChat ? true : false;

//   return (
//     <div className="flex-1 flex flex-col bg-[#E5DDD5]">
//       {/* Chat Header */}
//       <div className="bg-[#008069] px-4 py-3 flex items-center justify-between shadow-sm">
//         <div className="flex items-center gap-3">
//           <Avatar
//             src={chatAvatar}
//             alt={chatName}
//             fallback={chatName.charAt(0).toUpperCase()}
//             size="md"
//             showOnline={!!currentPrivateChat}
//             isOnline={isOnline}
//           />
//           <div className="flex-1 min-w-0">
//             <h1 className="text-white font-medium text-base truncate">
//               {chatName}
//             </h1>
//             {currentPrivateChat && (
//               <p className="text-white/80 text-xs">
//                 {isOnline ? "online" : "offline"}
//               </p>
//             )}
//             {currentRoom?.description && (
//               <p className="text-white/80 text-xs truncate">
//                 {currentRoom.description}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center gap-1">
//           <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
//             <Video className="h-5 w-5" />
//           </button>
//           <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
//             <Phone className="h-5 w-5" />
//           </button>
//           <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
//             <MoreVertical className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 flex flex-col min-h-0 relative">
//         <div className="absolute inset-0 bg-[#E5DDD5] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Q0ZDRkNCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
//         <MessageList />
//         <TypingIndicator />
//       </div>

//       {/* Message Input */}
//       <MessageInput />
//     </div>
//   );
// };

// export default ChatArea;

//----------------------------------------------

"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  Video,
  Phone,
  Search,
  Pin,
  Star,
  Archive,
  Bell,
  BellOff,
  UserPlus,
  Info,
  X,
} from "lucide-react";
import { useChatState } from "@/modules/_shared/hooks/useChatState";
import {
  MessageList,
  MessageInput,
  TypingIndicator,
} from "@/modules/chat/components";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/modules/_shared/lib/utils";

const ChatArea: React.FC = () => {
  const { currentRoom, currentPrivateChat } = useChatState();
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  if (!currentRoom && !currentPrivateChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="text-center max-w-lg px-8">
          {/* Animated illustration */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-4 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <svg
                className="w-24 h-24 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-2xl">✨</span>
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-2xl">💬</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Welcome to Chat
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
            Select a conversation to start messaging with your friends and
            colleagues
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: "🔒", label: "Secure" },
              { icon: "⚡", label: "Fast" },
              { icon: "🌍", label: "Connected" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <span className="text-3xl block mb-2">{feature.icon}</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const chatName = currentRoom?.name || currentPrivateChat?.username || "";
  const chatAvatar = currentPrivateChat?.profile_picture;
  const isOnline = currentPrivateChat ? true : false;
  const memberCount = currentRoom?.users?.length;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Chat Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-4 py-3 shadow-lg relative z-10">
        <div className="flex items-center justify-between">
          {/* Left section - Chat info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={() => setShowInfo(true)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <Avatar
                  src={chatAvatar}
                  alt={chatName}
                  fallback={chatName.charAt(0).toUpperCase()}
                  size="md"
                  className="ring-2 ring-white/30"
                />
                {currentPrivateChat && isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-600"></div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h1 className="text-white font-semibold text-base truncate flex items-center gap-2">
                  {chatName}
                  {currentRoom && (
                    <span className="text-xs font-normal text-blue-100">
                      ({memberCount} members)
                    </span>
                  )}
                </h1>
                {currentPrivateChat && (
                  <p className="text-blue-100 text-xs flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isOnline ? "bg-green-400" : "bg-gray-400"
                      }`}
                    ></span>
                    {isOnline ? "Active now" : "Offline"}
                  </p>
                )}
                {currentRoom?.description && (
                  <p className="text-blue-100 text-xs truncate">
                    {currentRoom.description}
                  </p>
                )}
              </div>
            </button>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-1">
            <button
              className="p-2.5 text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
              title="Search in conversation"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className="p-2.5 text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
              title="Voice call"
            >
              <Phone className="h-5 w-5" />
            </button>
            <button
              className="p-2.5 text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
              title="Video call"
            >
              <Video className="h-5 w-5" />
            </button>

            {/* More options menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2.5 text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
                title="More options"
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                      <Info className="h-4 w-4" />
                      Contact info
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                      <Pin className="h-4 w-4" />
                      Pin chat
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                      <Bell className="h-4 w-4" />
                      Mute notifications
                    </button>
                    {currentRoom && (
                      <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                        <UserPlus className="h-4 w-4" />
                        Add members
                      </button>
                    )}
                    <div className="my-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                      <Archive className="h-4 w-4" />
                      Archive chat
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
                    >
                      <X className="h-4 w-4" />
                      Close chat
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <MessageList />
        <TypingIndicator />
      </div>

      {/* Message Input */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <MessageInput />
      </div>

      {/* Info Sidebar (optional) */}
      {showInfo && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
            onClick={() => setShowInfo(false)}
          ></div>
          <div className="fixed right-0 top-0 bottom-0 w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              {/* Info header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Contact Info
                  </h2>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar
                    src={chatAvatar}
                    alt={chatName}
                    fallback={chatName.charAt(0).toUpperCase()}
                    size="lg"
                    className="mb-3"
                  />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {chatName}
                  </h3>
                  {currentPrivateChat && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {isOnline ? "Online" : "Offline"}
                    </p>
                  )}
                </div>
              </div>

              {/* Info content */}
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  More details coming soon...
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
