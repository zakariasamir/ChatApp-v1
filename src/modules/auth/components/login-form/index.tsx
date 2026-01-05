"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/modules/_shared/contexts/AuthContext";
import { loginSchema, LoginFormData } from "@/modules/_shared/lib/validations";
import { cn } from "@/modules/_shared/lib/utils";
import { ApiError } from "@/modules/_shared/types";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (error: unknown) {
      setError("root", {
        message:
          (error as ApiError).response?.data?.message ||
          "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className="relative bg-linear-to-br from-blue-600 via-blue-700 to-purple-700 px-8 pt-12 pb-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-100">
              Sign in to continue your conversations
            </p>
          </div>
        </div>

        {/* Form content */}
        <div className="px-8 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Error message */}
            {errors.root && (
              <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl animate-in slide-in-from-top-2 duration-200">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-sm">{errors.root.message}</p>
              </div>
            )}

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={cn(
                    "w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "dark:bg-slate-800 dark:text-slate-100",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.email
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                  )}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={cn(
                    "w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "dark:bg-slate-800 dark:text-slate-100",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.password
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                  )}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white",
                "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                "shadow-lg hover:shadow-xl transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg",
                !isLoading && "hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                New to our platform?
              </span>
            </div>
          </div>

          {/* Switch to register */}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Create an account
          </button>
        </div>
      </div>

      {/* Footer text */}
      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        By continuing, you agree to our{" "}
        <button className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
          Terms
        </button>{" "}
        and{" "}
        <button className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
          Privacy Policy
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
