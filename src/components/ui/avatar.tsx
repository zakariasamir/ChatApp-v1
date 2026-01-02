"use client";

import * as React from "react";
import { cn } from "@/modules/_shared/lib/utils";
import Image from "next/image";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  showOnline?: boolean;
  isOnline?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      size = "md",
      showOnline = false,
      isOnline = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex shrink-0", className)}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || ""}
            width={40}
            height={40}
            className={cn("rounded-full object-cover", sizeClasses[size])}
          />
        ) : (
          <div
            className={cn(
              "rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium",
              sizeClasses[size]
            )}
          >
            {fallback || "?"}
          </div>
        )}
        {showOnline && (
          <span
            className={cn(
              "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
              isOnline ? "bg-green-500" : "bg-gray-400"
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
