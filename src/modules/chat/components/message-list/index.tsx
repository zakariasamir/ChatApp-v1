"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { ArrowDown, Loader2 } from "lucide-react";
import { useChatState } from "@/modules/_shared/hooks/useChatState";
import { useAuth } from "@/modules/_shared/contexts/AuthContext";
import API from "@/router/index";
import { MessageBubble } from "@/modules/chat/components";
import { formatDate } from "@/modules/_shared/lib/utils";
import { Message } from "@/modules/_shared/types";

const MessageList: React.FC = () => {
  const { currentRoom, currentPrivateChat } = useChatState();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // Use router hooks for data fetching
  const { messages: roomMessagesResult, isLoading: roomLoading } =
    API.v1.rooms.messages.useFindAll({
      roomId: currentRoom?.id || "",
    });
  const { messages: privateMessagesResult, isLoading: privateLoading } =
    API.v1.users.messages.useFindAll({
      userId: currentPrivateChat?.id || "",
    });

  const roomMessages = currentRoom ? roomMessagesResult || [] : [];
  const privateMessages = currentPrivateChat ? privateMessagesResult || [] : [];

  // Determine which messages to display
  const messages = useMemo(() => {
    return currentRoom
      ? roomMessages
      : currentPrivateChat
      ? privateMessages
      : [];
  }, [currentRoom, roomMessages, currentPrivateChat, privateMessages]);

  const isLoading = currentRoom
    ? roomLoading
    : currentPrivateChat
    ? privateLoading
    : false;

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Show scroll button if user is more than 200px from bottom
    setShowScrollButton(distanceFromBottom > 200);

    // Detect if user is actively scrolling up
    setIsUserScrolling(distanceFromBottom > 100);
  };

  useEffect(() => {
    // Only auto-scroll if user isn't actively scrolling up
    if (!isUserScrolling) {
      scrollToBottom("smooth");
    }
  }, [messages, isUserScrolling]);

  useEffect(() => {
    // Scroll to bottom immediately when switching chats
    scrollToBottom("auto");
    setIsUserScrolling(false);
  }, [currentRoom?.id, currentPrivateChat?.id]);

  // Don't render if no active chat
  if (!currentRoom && !currentPrivateChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="text-center max-w-md px-6">
          <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-xl">
            <svg
              className="w-16 h-16 text-blue-600 dark:text-blue-400"
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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Welcome to Chat
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Select a conversation from the sidebar to start messaging
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Your messages are end-to-end encrypted
          </p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-linear-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 dark:border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-slate-900 dark:text-slate-100 font-medium mb-1">
            Loading messages
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  // Show empty state
  if ((messages as Message[]).length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-linear-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="text-center max-w-sm px-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full flex items-center justify-center shadow-inner">
            <svg
              className="w-12 h-12 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No messages yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Start the conversation by sending the first message
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = (messages as Message[]).reduce((groups, message) => {
    const date = formatDate(message.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="flex-1 relative bg-linear-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Messages container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto px-4 py-4 space-y-1 relative z-10 scroll-smooth"
      >
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="animate-in fade-in duration-300">
            {/* Date separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-700 dark:text-slate-300 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                {date}
              </div>
            </div>

            {/* Messages for this date */}
            <div className="space-y-1">
              {dateMessages.map((message, index) => {
                const prevMessage = index > 0 ? dateMessages[index - 1] : null;
                const showAvatar =
                  !prevMessage || prevMessage.sender_id !== message.sender_id;
                const isOwn = message.sender_id === user?.id;

                return (
                  <div
                    key={message._id}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-200"
                    style={{ animationDelay: `${index * 20}ms` }}
                  >
                    <MessageBubble
                      message={message}
                      isOwn={isOwn}
                      showAvatar={showAvatar}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={() => scrollToBottom("smooth")}
          className="absolute bottom-6 right-6 z-20 p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-slate-200 dark:border-slate-700 group"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></span>
        </button>
      )}
    </div>
  );
};

export default MessageList;
