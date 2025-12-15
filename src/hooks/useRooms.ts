import useSWR, { mutate } from "swr";
import { roomsAPI } from "@/lib/api";
import { Room } from "@/types";

// Fetcher function for rooms
const fetchRooms = async (): Promise<Room[]> => {
  return await roomsAPI.getAllRooms();
};

// Hook for rooms
export const useRooms = () => {
  const {
    data,
    error,
    isLoading,
    mutate: mutateRooms,
  } = useSWR("rooms", fetchRooms, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 5000,
  });

  return {
    rooms: data || [],
    isLoading,
    error,
    mutate: mutateRooms,
  };
};

// Hook for creating rooms
export const useCreateRoom = () => {
  const createRoom = async (data: {
    name: string;
    description?: string;
    is_private?: boolean;
  }) => {
    const room = await roomsAPI.createRoom(data);

    // Update the cache optimistically
    mutate(
      "rooms",
      (currentRooms: Room[] = []) => {
        return [...currentRooms, room];
      },
      false
    );

    return room;
  };

  return { createRoom };
};

