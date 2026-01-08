"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Loader2,
  Users,
  Lock,
  Globe,
  Hash,
  AlertCircle,
} from "lucide-react";
import { useChatState } from "@/modules/_shared/hooks/useChatState";
import API from "@/router/index";
import {
  createRoomSchema,
  CreateRoomFormData,
} from "@/modules/_shared/lib/validations";
import { cn } from "@/modules/_shared/lib/utils";
import { ApiError } from "@/modules/_shared/types";

interface CreateRoomModalProps {
  onClose: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectRoom } = useChatState();
  const { trigger: createRoomTrigger } = API.v1.rooms.useCreateOne();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
      is_private: false,
    },
  });

  const isPrivate = watch("is_private");

  const onSubmit = async (data: CreateRoomFormData) => {
    setIsLoading(true);
    try {
      const response = await createRoomTrigger(data);
      const newRoom = response?.data?.room || response;
      selectRoom(newRoom);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Hash className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Create New Room
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Set up a space for your team
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-5">
          {/* Error message */}
          {errors.root && (
            <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-sm">{errors.root.message}</p>
            </div>
          )}

          {/* Room Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Room Name
            </label>
            <div className="relative">
              <input
                {...register("name")}
                type="text"
                id="name"
                className={cn(
                  "w-full px-4 py-3 pl-10 border rounded-xl shadow-sm transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "dark:bg-slate-800 dark:text-slate-100",
                  errors.name
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                )}
                placeholder="e.g., Team Discussions"
              />
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Description
              <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">
                (Optional)
              </span>
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows={3}
              className={cn(
                "w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 resize-none",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "dark:bg-slate-800 dark:text-slate-100",
                errors.description
                  ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                  : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
              )}
              placeholder="What's this room about?"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Privacy Toggle */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Privacy
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Public option */}
              <label
                className={cn(
                  "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                  !isPrivate
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                )}
              >
                <input
                  {...register("is_private")}
                  type="radio"
                  value="false"
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    !isPrivate
                      ? "bg-blue-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  )}
                >
                  <Globe
                    className={cn(
                      "h-5 w-5",
                      !isPrivate
                        ? "text-white"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  />
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      "text-sm font-semibold",
                      !isPrivate
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-slate-700 dark:text-slate-300"
                    )}
                  >
                    Public
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Anyone can join
                  </div>
                </div>
              </label>

              {/* Private option */}
              <label
                className={cn(
                  "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                  isPrivate
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                )}
              >
                <input
                  {...register("is_private")}
                  type="radio"
                  value="true"
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    isPrivate ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"
                  )}
                >
                  <Lock
                    className={cn(
                      "h-5 w-5",
                      isPrivate
                        ? "text-white"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  />
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      "text-sm font-semibold",
                      isPrivate
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-slate-700 dark:text-slate-300"
                    )}
                  >
                    Private
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Invite only
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Creating...
                </>
              ) : (
                <>
                  <Users className="h-4 w-4" />
                  Create Room
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
