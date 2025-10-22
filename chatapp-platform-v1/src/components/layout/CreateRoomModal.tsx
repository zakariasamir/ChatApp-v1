"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { roomsAPI } from "@/lib/api";
import { createRoomSchema, CreateRoomFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { ApiError } from "@/types";

interface CreateRoomModalProps {
  onClose: () => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentRoom, refreshRooms } = useChat();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
      is_private: false,
    },
  });

  const onSubmit = async (data: CreateRoomFormData) => {
    setIsLoading(true);
    try {
      const newRoom = await roomsAPI.createRoom(data);
      await refreshRooms(); // Refresh the rooms list
      setCurrentRoom(newRoom);
      onClose();
    } catch (error: unknown) {
      setError("root", {
        message:
          (error as ApiError).response?.data?.message ||
          "Failed to create room. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New Room
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {errors.root && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {errors.root.message}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Room Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className={cn(
                "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                errors.name ? "border-red-300" : "border-gray-300"
              )}
              placeholder="Enter room name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description (Optional)
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows={3}
              className={cn(
                "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                errors.description ? "border-red-300" : "border-gray-300"
              )}
              placeholder="Enter room description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              {...register("is_private")}
              type="checkbox"
              id="is_private"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="is_private"
              className="ml-2 block text-sm text-gray-700"
            >
              Private room
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : (
                "Create Room"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
