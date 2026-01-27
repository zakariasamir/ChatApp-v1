"use client";

import React from "react";
import { useChatState } from "@/modules/_shared/hooks/useChatState";

const TypingIndicator: React.FC = () => {
  const { currentRoom, currentPrivateChat } = useChatState();

  // For now, we'll show a simple typing indicator
  // In a real app, you'd track typing users from socket events
  const [typingUsers] = React.useState<string[]>([]);

  if ((!currentRoom && !currentPrivateChat) || typingUsers.length === 0) {
    return null;
  }

  const getTypingText = () => {
    if (typingUsers.length === 1) {
      return (
        <>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {typingUsers[0]}
          </span>
          <span className="text-slate-600 dark:text-slate-400"> is typing</span>
        </>
      );
    } else if (typingUsers.length === 2) {
      return (
        <>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {typingUsers[0]}
          </span>
          <span className="text-slate-600 dark:text-slate-400"> and </span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {typingUsers[1]}
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            {" "}
            are typing
          </span>
        </>
      );
    } else if (typingUsers.length === 3) {
      return (
        <>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {typingUsers[0]}, {typingUsers[1]}
          </span>
          <span className="text-slate-600 dark:text-slate-400"> and </span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {typingUsers[2]}
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            {" "}
            are typing
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {typingUsers.length} people
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            {" "}
            are typing
          </span>
        </>
      );
    }
  };

  return (
    <div className="px-4 pb-2 relative z-10 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="flex items-center gap-3">
        {/* Animated typing dots */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 rounded-full px-4 py-2.5 shadow-md border border-slate-200 dark:border-slate-700">
          <div
            className="w-2 h-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-full animate-bounce"
            style={{ animationDuration: "1s" }}
          />
          <div
            className="w-2 h-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.15s", animationDuration: "1s" }}
          />
          <div
            className="w-2 h-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s", animationDuration: "1s" }}
          />
        </div>

        {/* Typing text */}
        <div className="text-sm animate-in fade-in slide-in-from-left-2 duration-300">
          {getTypingText()}
        </div>
      </div>

      {/* Subtle pulse effect */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 rounded-lg animate-pulse pointer-events-none"></div>
    </div>
  );
};

export default TypingIndicator;
