"use client";

import React from "react";
import { MessageSquare, Users, Hash, Lock, Sparkles } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";

export const ChatArea: React.FC = () => {
  const { currentRoom, currentPrivateChat, messages } = useChat();

  if (!currentRoom && !currentPrivateChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center max-w-md px-6">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <div className="absolute top-0 right-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-purple-400 rounded-full opacity-20 animate-pulse delay-75" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to ChatApp
          </h2>
          <p className="text-gray-600 mb-4">
            Select a room from the sidebar or create a new one to start chatting
            with others
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>Real-time chat</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Online users</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-white to-blue-50 shadow-sm">
        <div className="flex items-center space-x-3">
          {currentRoom ? (
            <>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                {currentRoom.is_private ? (
                  <Lock className="h-6 w-6 text-white" />
                ) : (
                  <Hash className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-bold text-gray-900">
                    {currentRoom.name}
                  </h1>
                  {currentRoom.is_private && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      Private
                    </span>
                  )}
                </div>
                {currentRoom.description && (
                  <p className="text-sm text-gray-600">
                    {currentRoom.description}
                  </p>
                )}
              </div>
            </>
          ) : currentPrivateChat ? (
            <>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-bold text-gray-900">
                    {currentPrivateChat.username}
                  </h1>
                  <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Private Chat
                  </span>
                </div>
                <p className="text-sm text-gray-600">Direct message</p>
              </div>
            </>
          ) : null}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {messages.length}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-white to-gray-50">
        <MessageList />
        <TypingIndicator />
        <MessageInput />
      </div>
    </div>
  );
};
