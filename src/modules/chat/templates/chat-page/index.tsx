"use client";

import React from "react";
import { ProtectedRoute } from "@/modules/auth/components";
import { ChatInterface } from "@/modules/chat/patterns";

const ChatPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <ChatInterface />
    </ProtectedRoute>
  );
};

export default ChatPage;
