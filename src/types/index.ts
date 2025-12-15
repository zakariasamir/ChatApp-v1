// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  profile_picture: string;
  is_online?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Room Types
export interface Room {
  id: string;
  name: string;
  description?: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

// Message Types
export interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id?: string;
  room_id?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    id: string;
    username: string;
    profile_picture: string;
  };
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  profile_picture?: File;
}

export interface AuthResponse {
  message: string;
  user: User;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  error?: string;
}

// Socket Event Types
export interface SocketEvents {
  // Connection events
  connect: () => void;
  disconnect: () => void;

  // User events
  "user:online": (user: User) => void;
  "user:offline": (data: { id: string }) => void;

  // Room events
  "room:join": (roomId: string) => void;
  "room:leave": (roomId: string) => void;

  // Message events
  "message:room": (message: Message) => void;
  "message:private": (message: Message) => void;

  // Typing events
  "typing:start": (data: { user: User; roomId?: string }) => void;
  "typing:stop": (data: { user: User; roomId?: string }) => void;
}

// Socket Emit Events
export interface SocketEmitEvents {
  "room:join": (roomId: string) => void;
  "room:leave": (roomId: string) => void;
  "message:room": (data: { roomId: string; content: string }) => void;
  "message:private": (data: { receiverId: string; content: string }) => void;
  "typing:start": (data: { roomId?: string; receiverId?: string }) => void;
  "typing:stop": (data: { roomId?: string; receiverId?: string }) => void;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile_picture?: FileList;
}

export interface CreateRoomFormData {
  name: string;
  description?: string;
  is_private: boolean;
}

// Component Props Types
export interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export interface RoomItemProps {
  room: Room;
  isActive: boolean;
  onClick: () => void;
}

export interface UserItemProps {
  user: User;
  isOnline: boolean;
  onClick?: () => void;
}

// Utility Types
export type ChatMode = "rooms" | "private";

export interface TypingUser {
  user: User;
  roomId?: string;
}

// Error Types
export interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}
