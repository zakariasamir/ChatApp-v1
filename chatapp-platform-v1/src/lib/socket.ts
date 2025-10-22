import { io, Socket } from "socket.io-client";
import { SocketEvents, SocketEmitEvents, User, Message } from "@/types";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5004";

class SocketService {
  private socket: Socket<SocketEvents, SocketEmitEvents> | null = null;
  private isConnected = false;

  connect(): Socket<SocketEvents, SocketEmitEvents> {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    this.socket.on("connect", () => {
      console.log("Connected to server");
      this.isConnected = true;
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from server");
      this.isConnected = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      this.isConnected = false;
    });

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  getSocket(): Socket<SocketEvents, SocketEmitEvents> | null {
    return this.socket;
  }

  getConnectionStatus(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  // Room methods
  joinRoom(roomId: string): void {
    if (this.socket?.connected) {
      this.socket.emit("room:join", roomId);
    }
  }

  leaveRoom(roomId: string): void {
    if (this.socket?.connected) {
      this.socket.emit("room:leave", roomId);
    }
  }

  // Message methods
  sendRoomMessage(roomId: string, content: string): void {
    if (this.socket?.connected) {
      this.socket.emit("message:room", { roomId, content });
    }
  }

  sendPrivateMessage(receiverId: string, content: string): void {
    if (this.socket?.connected) {
      this.socket.emit("message:private", { receiverId, content });
    }
  }

  // Typing methods
  startTyping(roomId?: string, receiverId?: string): void {
    if (this.socket?.connected) {
      this.socket.emit("typing:start", { roomId, receiverId });
    }
  }

  stopTyping(roomId?: string, receiverId?: string): void {
    if (this.socket?.connected) {
      this.socket.emit("typing:stop", { roomId, receiverId });
    }
  }

  // Event listeners
  onUserOnline(callback: (user: User) => void): void {
    if (this.socket) {
      this.socket.on("user:online", callback);
    }
  }

  onUserOffline(callback: (data: { id: string }) => void): void {
    if (this.socket) {
      this.socket.on("user:offline", callback);
    }
  }

  onRoomMessage(callback: (message: Message) => void): void {
    if (this.socket) {
      this.socket.on("message:room", callback);
    }
  }

  onPrivateMessage(callback: (message: Message) => void): void {
    if (this.socket) {
      this.socket.on("message:private", callback);
    }
  }

  onTypingStart(
    callback: (data: { user: User; roomId?: string }) => void
  ): void {
    if (this.socket) {
      this.socket.on("typing:start", callback);
    }
  }

  onTypingStop(callback: (data: { user: User; roomId?: string }) => void): void {
    if (this.socket) {
      this.socket.on("typing:stop", callback);
    }
  }

  // Remove event listeners
  offUserOnline(callback?: (user: User) => void): void {
    if (this.socket) {
      this.socket.off("user:online", callback);
    }
  }

  offUserOffline(callback?: (data: { id: string }) => void): void {
    if (this.socket) {
      this.socket.off("user:offline", callback);
    }
  }

  offRoomMessage(callback?: (message: Message) => void): void {
    if (this.socket) {
      this.socket.off("message:room", callback);
    }
  }

  offPrivateMessage(callback?: (message: Message) => void): void {
    if (this.socket) {
      this.socket.off("message:private", callback);
    }
  }

  offTypingStart(
    callback?: (data: { user: User; roomId?: string }) => void
  ): void {
    if (this.socket) {
      this.socket.off("typing:start", callback);
    }
  }

  offTypingStop(
    callback?: (data: { user: User; roomId?: string }) => void
  ): void {
    if (this.socket) {
      this.socket.off("typing:stop", callback);
    }
  }
}

export const socketService = new SocketService();
export default socketService;
