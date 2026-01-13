"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/modules/_shared/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showFilters?: boolean;
  onFilterClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search conversations...",
  className,
  showFilters = false,
  onFilterClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when clicking the search icon
  const handleSearchClick = () => {
    inputRef.current?.focus();
  };

  // Clear search with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && value) {
        onChange("");
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [value, onChange]);

  return (
    <div
      className={cn("relative px-3 py-3 bg-white dark:bg-slate-900", className)}
    >
      <div
        className={cn(
          "relative transition-all duration-200",
          isFocused && "scale-[1.02]"
        )}
      >
        {/* Search Icon */}
        <button
          onClick={handleSearchClick}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200",
            isFocused || value
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-400 dark:text-slate-500"
          )}
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Input Field */}
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "pl-10 pr-20 py-2.5 rounded-xl transition-all duration-200",
            "bg-slate-100 dark:bg-slate-800 border-0",
            "focus:bg-white dark:focus:bg-slate-800",
            "focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600",
            "focus:shadow-lg dark:focus:shadow-blue-900/20",
            "text-slate-900 dark:text-slate-100",
            "placeholder:text-slate-500 dark:placeholder:text-slate-400",
            isFocused &&
              "bg-white dark:bg-slate-800 shadow-lg dark:shadow-blue-900/10"
          )}
        />

        {/* Right Actions */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Clear Button */}
          {value && (
            <button
              onClick={() => onChange("")}
              className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all hover:scale-110 animate-in fade-in zoom-in-50 duration-150"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Filter Button */}
          {showFilters && (
            <button
              onClick={onFilterClick}
              className={cn(
                "p-1.5 rounded-full transition-all duration-200 hover:scale-110",
                value || isFocused
                  ? "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
              aria-label="Filter options"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Search Results Count (optional) */}
        {value && (
          <div className="absolute -bottom-6 left-3 text-xs text-slate-500 dark:text-slate-400 animate-in fade-in slide-in-from-top-1 duration-200">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-mono">
              ESC
            </kbd>{" "}
            to clear
          </div>
        )}
      </div>

      {/* Focus indicator line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 rounded-full mx-3",
          isFocused ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        )}
      ></div>
    </div>
  );
};

export default SearchBar;
