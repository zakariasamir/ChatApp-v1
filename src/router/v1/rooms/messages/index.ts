import request from "@/modules/_shared/lib/request";
import { Message } from "@/modules/_shared/types";
import qs from "qs";
import useSWR, { mutate, SWRConfiguration } from "swr";
import useSWRMutation from "swr/mutation";

type useFindAllParams = { roomId: string };
type useFindAllQuery = Record<string, string>;

export function useFindAll(
  params: useFindAllParams,
  query?: useFindAllQuery,
  swrConfig?: SWRConfiguration
) {
  const { roomId } = params;

  const key =
    roomId && roomId.trim() !== ""
      ? `/v1/rooms/${roomId}/messages?${qs.stringify(query || {})}`
      : null;
  const {
    data,
    isLoading,
    isValidating,
    error,
    mutate: mutateMessages,
  } = useSWR(key, (url) => request.get(url), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    ...swrConfig,
  });
  return {
    messages: data?.data,
    isLoading: isLoading,
    isValidating: isValidating,
    error,
    mutate: mutateMessages,
  };
}

// type useFindOneByIdParams = {
//   roomId: string;
// };

// export function useFindOneById(
//   params: useFindOneByIdParams,
//   query?: useFindAllQuery,
//   swrConfig?: SWRConfiguration
// ) {
//   const { roomId } = params;

//   const key = roomId ? `/v1/rooms/${roomId}?${qs.stringify(query)}` : null;
//   const { data, isLoading, isValidating, error, mutate } = useSWR(
//     key,
//     (url) => request.get(url),
//     swrConfig
//   );
//   return {
//     room: data?.data,
//     isLoading: isLoading,
//     isValidating: isValidating,
//     error,
//     mutate,
//   };
// }
type useCreateOneParams = {
  roomId: string;
};

export function useCreateOne(params: useCreateOneParams) {
  const { roomId } = params;

  const key =
    roomId && roomId.trim() !== "" ? `/v1/rooms/${roomId}/messages` : null;
  const { trigger, data, error, isMutating } = useSWRMutation(
    key,
    async (url, { arg: content }) => {
      const response = await request.post(url, { content });
      // Optimistically update the cache
      if (roomId) {
        mutate(
          `/v1/rooms/${roomId}/messages`,
          (currentMessages: Message[] = []) => {
            const newMessage =
              response?.data?.data || response?.data || response;
            return [...currentMessages, newMessage];
          },
          false
        );
      }
      return response;
    }
  );
  return { trigger, data, error, isMutating };
}

// export function useUpdateOne() {
//   const key = `/v1/rooms/`;
//   const { trigger, data, error, isMutating } = useSWRMutation(
//     key,
//     (url, { arg: data }) => request.put(url, data)
//   );
//   return { trigger, data, error, isMutating };
// }

// type useDeleteOneParams = {
//   roomId: string;
// };

// export function useDeleteOne(params: useDeleteOneParams) {
//   const { roomId } = params;

//   const key = roomId ? `/v1/rooms/${roomId}` : null;
//   const { trigger, data, error, isMutating } = useSWRMutation(key, (url) =>
//     request.delete(url)
//   );
//   return { trigger, data, error, isMutating };
// }

export function addRoomMessageToCache(message: Message, roomId?: string) {
  if (roomId) {
    mutate(
      `/v1/rooms/${roomId}/messages`,
      (currentMessages: Message[] = []) => {
        // Check if message already exists to avoid duplicates
        const exists = currentMessages.some((m) => m.id === message.id);
        if (exists) return currentMessages;
        return [...currentMessages, message];
      },
      false
    );
  }
}
