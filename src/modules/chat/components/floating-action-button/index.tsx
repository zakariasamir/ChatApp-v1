"use client";

import React, { useState } from "react";
import { MessageSquare, Plus, X, Users, UserPlus, Hash } from "lucide-react";
import { CreateRoomModal } from "@/modules/chat/components";
import { cn } from "@/modules/_shared/lib/utils";

interface FloatingActionButtonProps {
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  className,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Hash,
      label: "Create Room",
      onClick: () => {
        setShowModal(true);
        setIsOpen(false);
      },
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700",
    },
    {
      icon: UserPlus,
      label: "New Chat",
      onClick: () => {
        // TODO: Implement new chat functionality
        setIsOpen(false);
      },
      color: "from-green-500 to-green-600",
      hoverColor: "from-green-600 to-green-700",
    },
    {
      icon: Users,
      label: "New Group",
      onClick: () => {
        // TODO: Implement new group functionality
        setIsOpen(false);
      },
      color: "from-purple-500 to-purple-600",
      hoverColor: "from-purple-600 to-purple-700",
    },
  ];

  return (
    <>
      {/* Action buttons */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col-reverse gap-3">
        {isOpen &&
          actions.map((action, index) => (
            <div
              key={action.label}
              className="flex items-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-slate-900 dark:bg-slate-800 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                {action.label}
              </span>
              <button
                onClick={action.onClick}
                className={cn(
                  "w-12 h-12 bg-linear-to-r text-white rounded-full shadow-lg",
                  "flex items-center justify-center transition-all duration-200",
                  "hover:shadow-xl hover:scale-110",
                  action.color,
                  `hover:bg-linear-to-r hover:${action.hoverColor}`
                )}
                aria-label={action.label}
              >
                <action.icon className="h-5 w-5" />
              </button>
            </div>
          ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600",
          "text-white rounded-full shadow-2xl",
          "flex items-center justify-center transition-all duration-300",
          "hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)]",
          "hover:scale-110 active:scale-95",
          "z-50 group",
          isOpen && "rotate-45",
          className
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative">
          <Plus
            className={cn(
              "h-7 w-7 transition-all duration-300",
              isOpen && "rotate-90"
            )}
          />
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
          )}
        </div>

        {/* Ripple effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          )}
        ></div>
      </button>

      {/* Backdrop when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Create Room Modal */}
      {showModal && <CreateRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default FloatingActionButton;
