import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: string | Date): string {
  const messageDate = new Date(date);
  const now = new Date();
  const diffInHours =
    (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diffInHours < 24 * 7) {
    return messageDate.toLocaleDateString([], {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export function formatDate(date: string | Date): string {
  const messageDate = new Date(date);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return messageDate.toLocaleDateString([], { weekday: "long" });
  } else {
    return messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateRoomId(): string {
  return Math.random().toString(36).substr(2, 9);
}
