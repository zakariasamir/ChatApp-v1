"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, ChatArea } from "@/modules/chat/components";
import { ArrowLeft, Menu, Maximize2, Minimize2 } from "lucide-react";
import { useChatState } from "@/modules/_shared/hooks/useChatState";
import { cn } from "@/modules/_shared/lib/utils";

const ChatLayout: React.FC = () => {
  const { currentRoom, currentPrivateChat } = useChatState();
  const [showSidebar, setShowSidebar] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasActiveChat = !!currentRoom || !!currentPrivateChat;

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-hide sidebar on mobile when chat is selected
  useEffect(() => {
    if (isMobile && hasActiveChat) {
      setShowSidebar(false);
    }
  }, [hasActiveChat, isMobile]);

  // Handle back navigation on mobile
  const handleBack = () => {
    if (isMobile) {
      // TODO: Implement clearChat function
      setShowSidebar(true);
    } else {
      setShowSidebar(!showSidebar);
    }
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="h-screen flex bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/3 dark:to-purple-500/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-pink-500/5 to-orange-500/5 dark:from-pink-500/3 dark:to-orange-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main container */}
      <div className="flex-1 flex relative z-10 max-w-[1920px] mx-auto w-full shadow-2xl">
        {/* Sidebar */}
        <div
          className={cn(
            "transition-all duration-300 ease-out",
            "w-full sm:w-96 lg:w-[420px] shrink-0",
            "absolute sm:relative inset-0 z-30",
            "bg-white dark:bg-slate-900",
            "border-r border-slate-200 dark:border-slate-800",
            "shadow-xl sm:shadow-none",
            // Mobile animations
            isMobile && hasActiveChat && !showSidebar && "-translate-x-full",
            isMobile && (!hasActiveChat || showSidebar) && "translate-x-0",
            // Desktop behavior
            !isMobile && !showSidebar && "-translate-x-full sm:translate-x-0",
            !isMobile && showSidebar && "translate-x-0"
          )}
        >
          <Sidebar />
        </div>

        {/* Chat Area */}
        <div
          className={cn(
            "flex-1 flex flex-col min-w-0 relative",
            "bg-white dark:bg-slate-900",
            "transition-all duration-300",
            // Mobile visibility
            isMobile && !hasActiveChat && "hidden",
            isMobile && hasActiveChat && "flex",
            // Desktop visibility
            !isMobile && "flex"
          )}
        >
          {/* Top action bar (mobile only) */}
          {isMobile && hasActiveChat && (
            <div className="absolute top-3 left-3 z-40 flex gap-2">
              <button
                onClick={handleBack}
                className="p-2.5 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-slate-200 dark:border-slate-700"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              </button>
            </div>
          )}

          {/* Desktop sidebar toggle */}
          {!isMobile && (
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="absolute top-4 left-4 z-40 p-2.5 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-slate-200 dark:border-slate-700 hidden sm:block"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            </button>
          )}

          {/* Fullscreen toggle (desktop only) */}
          {!isMobile && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-40 p-2.5 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-slate-200 dark:border-slate-700 hidden sm:block"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              ) : (
                <Maximize2 className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              )}
            </button>
          )}

          <ChatArea />
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && hasActiveChat && showSidebar && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 animate-in fade-in duration-200"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Keyboard shortcut hint (desktop only) */}
      {!isMobile && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full shadow-lg border border-slate-700">
            Press{" "}
            <kbd className="px-2 py-0.5 bg-slate-700 rounded mx-1">Ctrl</kbd> +{" "}
            <kbd className="px-2 py-0.5 bg-slate-700 rounded mx-1">B</kbd> to
            toggle sidebar
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
