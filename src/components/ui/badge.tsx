"use client";

import * as React from "react";
import { cn } from "@/modules/_shared/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-green-500 text-white",
      secondary: "bg-gray-100 text-gray-900",
      destructive: "bg-red-500 text-white",
      outline: "border border-gray-300 text-gray-900",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
