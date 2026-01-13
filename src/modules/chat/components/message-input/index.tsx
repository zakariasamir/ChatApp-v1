"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  X,
  Image as ImageIcon,
  File,
  Camera,
} from "lucide-react";
import { useChatState } from "@/modules/_shared/hooks/useChatState";
import API from "@/router/index";
import { socketService } from "@/modules/_shared/lib/socket";
import { cn } from "@/modules/_shared/lib/utils";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { currentRoom, currentPrivateChat } = useChatState();
  const { trigger: sendRoomMessageTrigger } =
    API.v1.rooms.messages.useCreateOne({
      roomId: currentRoom?.id || "",
    });
  const { trigger: sendPrivateMessageTrigger } =
    API.v1.users.messages.useCreateOne({
      userId: currentPrivateChat?.id || "",
    });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        if (currentRoom) {
          socketService.sendRoomMessage(currentRoom.id, message.trim());
          await sendRoomMessageTrigger(message.trim());
          socketService.stopTyping(currentRoom.id);
        } else if (currentPrivateChat) {
          await sendPrivateMessageTrigger(message.trim());
          socketService.stopTyping(undefined, currentPrivateChat.id);
        }
        setMessage("");
        setIsTyping(false);
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (currentRoom) {
      if (value.trim() && !isTyping) {
        setIsTyping(true);
        socketService.startTyping(currentRoom.id);
      } else if (!value.trim() && isTyping) {
        setIsTyping(false);
        socketService.stopTyping(currentRoom.id);
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (value.trim()) {
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          socketService.stopTyping(currentRoom.id);
        }, 1000);
      }
    } else if (currentPrivateChat) {
      if (value.trim() && !isTyping) {
        setIsTyping(true);
        socketService.startTyping(undefined, currentPrivateChat.id);
      } else if (!value.trim() && isTyping) {
        setIsTyping(false);
        socketService.stopTyping(undefined, currentPrivateChat.id);
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (value.trim()) {
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          socketService.stopTyping(undefined, currentPrivateChat.id);
        }, 1000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = message.substring(0, start) + emoji + message.substring(end);
      setMessage(text);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [message]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  if (!currentRoom && !currentPrivateChat) {
    return null;
  }

  const hasMessage = message.trim().length > 0;

  const emojis = [
    "😀",
    "😂",
    "😍",
    "🥰",
    "😎",
    "🤔",
    "😢",
    "😭",
    "😡",
    "🤯",
    "👍",
    "👏",
    "🙏",
    "❤️",
    "🔥",
    "✨",
    "🎉",
    "💯",
    "👀",
    "🚀",
  ];

  const attachmentOptions = [
    { icon: ImageIcon, label: "Photo", color: "from-purple-500 to-purple-600" },
    { icon: Camera, label: "Camera", color: "from-pink-500 to-pink-600" },
    { icon: File, label: "Document", color: "from-blue-500 to-blue-600" },
  ];

  return (
    <div className="relative bg-white dark:bg-slate-900 px-4 py-3 border-t border-slate-200 dark:border-slate-800">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setShowEmojiPicker(false)}
          ></div>
          <div className="absolute bottom-20 left-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-40 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Emoji
                </h3>
                <button
                  onClick={() => setShowEmojiPicker(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
              <div className="grid grid-cols-8 gap-1 max-w-[280px]">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      insertEmoji(emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-xl transition-all duration-150 hover:scale-125"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Attachment Menu */}
      {showAttachMenu && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setShowAttachMenu(false)}
          ></div>
          <div className="absolute bottom-20 left-16 z-40 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="flex flex-col gap-3">
              {attachmentOptions.map((option, index) => (
                <div
                  key={option.label}
                  className="flex items-center gap-3 animate-in slide-in-from-left-2 fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="bg-slate-900 dark:bg-slate-800 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    {option.label}
                  </span>
                  <button
                    onClick={() => {
                      setShowAttachMenu(false);
                      // TODO: Handle attachment
                    }}
                    className={cn(
                      "w-12 h-12 bg-linear-to-r text-white rounded-full shadow-lg",
                      "flex items-center justify-center transition-all duration-200",
                      "hover:shadow-xl hover:scale-110",
                      option.color
                    )}
                  >
                    <option.icon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="absolute top-0 left-0 right-0 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800 px-4 py-2 flex items-center gap-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-red-700 dark:text-red-400">
              Recording...
            </span>
            <span className="text-sm text-red-600 dark:text-red-400">0:00</span>
          </div>
          <button
            onClick={() => setIsRecording(false)}
            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      )}

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {/* Left Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setShowAttachMenu(false);
            }}
            className={cn(
              "p-2.5 rounded-full transition-all duration-200",
              showEmojiPicker
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 scale-95"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
            )}
            aria-label="Add emoji"
          >
            <Smile className="h-5 w-5" />
          </button>

          {/* Attachment Button */}
          <button
            type="button"
            onClick={() => {
              setShowAttachMenu(!showAttachMenu);
              setShowEmojiPicker(false);
            }}
            className={cn(
              "p-2.5 rounded-full transition-all duration-200",
              showAttachMenu
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 scale-95"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105"
            )}
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className={cn(
              "w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-0 resize-none",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-sm",
              "text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400",
              "max-h-[120px] overflow-y-auto transition-all duration-200",
              "scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
            )}
            rows={1}
          />
          <div className="absolute bottom-2 right-3 text-xs text-slate-400 dark:text-slate-500">
            {message.length > 0 && `${message.length}`}
          </div>
        </div>

        {/* Send/Mic Button */}
        <button
          type={hasMessage ? "submit" : "button"}
          onClick={!hasMessage ? handleVoiceRecord : undefined}
          className={cn(
            "p-3 rounded-full transition-all duration-200 shrink-0 relative overflow-hidden group",
            hasMessage
              ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              : isRecording
              ? "bg-red-500 text-white shadow-lg animate-pulse"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105"
          )}
          aria-label={hasMessage ? "Send message" : "Record voice message"}
        >
          {hasMessage ? (
            <Send className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
          {hasMessage && (
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          )}
        </button>
      </form>

      {/* Character count hint */}
      {message.length > 900 && (
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-right">
          {1000 - message.length} characters remaining
        </div>
      )}
    </div>
  );
};

export default MessageInput;
