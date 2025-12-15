import axios, { AxiosResponse } from "axios";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  Room,
  Message,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5004/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // Token is handled by cookies, so no need to add it manually
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect to login for auth/me endpoint as it's expected to fail when not authenticated
      const url = error.config?.url;
      if (url && !url.includes("/auth/me")) {
        // Handle unauthorized access for other endpoints
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/login",
      data
    );
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.profile_picture) {
      formData.append("profile_picture", data.profile_picture);
    }

    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    const response: AxiosResponse<{ user: User }> = await api.get("/auth/me");
    return response.data.user;
  },
};

// Rooms API
export const roomsAPI = {
  getAllRooms: async (): Promise<Room[]> => {
    const response: AxiosResponse<{ rooms: Room[] }> = await api.get("/rooms");
    return response.data.rooms;
  },

  createRoom: async (data: {
    name: string;
    description?: string;
    is_private?: boolean;
  }): Promise<Room> => {
    const response: AxiosResponse<{ message: string; room: Room }> =
      await api.post("/rooms", data);
    return response.data.room;
  },
};

// Messages API
export const messagesAPI = {
  getRoomMessages: async (roomId: string): Promise<Message[]> => {
    const response: AxiosResponse<{ messages: Message[] }> = await api.get(
      `/messages/room/${roomId}`
    );
    return response.data.messages;
  },

  getPrivateMessages: async (userId: string): Promise<Message[]> => {
    const response: AxiosResponse<{ messages: Message[] }> = await api.get(
      `/messages/private/${userId}`
    );
    return response.data.messages;
  },

  createRoomMessage: async (
    roomId: string,
    content: string
  ): Promise<Message> => {
    const response: AxiosResponse<{ message: string; data: Message }> =
      await api.post(`/messages/room/${roomId}`, { content });
    return response.data.data;
  },

  createPrivateMessage: async (
    userId: string,
    content: string
  ): Promise<Message> => {
    const response: AxiosResponse<{ message: string; data: Message }> =
      await api.post(`/messages/private/${userId}`, { content });
    return response.data.data;
  },
};

// Health check
export const healthAPI = {
  check: async (): Promise<{ status: string; message: string }> => {
    const response: AxiosResponse<{ status: string; message: string }> =
      await api.get("/health");
    return response.data;
  },
};

export default api;
