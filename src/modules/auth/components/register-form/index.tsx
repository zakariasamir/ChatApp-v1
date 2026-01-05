"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Loader2,
  Upload,
  X,
  User,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  Camera,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/modules/_shared/contexts/AuthContext";
import {
  registerSchema,
  RegisterFormData,
} from "@/modules/_shared/lib/validations";
import { cn } from "@/modules/_shared/lib/utils";
import { ApiError } from "@/modules/_shared/types";
import Image from "next/image";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");

  // Calculate password strength
  React.useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;

    setPasswordStrength(Math.min(strength, 100));
  }, [password]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.files) {
      setValue("profile_picture", e.target.files);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setPreviewUrl(null);
    setValue("profile_picture", undefined);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data);
    } catch (error: unknown) {
      setError("root", {
        message:
          (error as ApiError).response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className="relative bg-linear-to-br from-purple-600 via-purple-700 to-pink-700 px-8 pt-12 pb-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Join Us Today
            </h1>
            <p className="text-purple-100">
              Create your account to get started
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

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Profile Picture
                <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">
                  (Optional)
                </span>
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {previewUrl ? (
                    <div className="relative group">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg">
                      <Camera className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    {...register("profile_picture")}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profile_picture"
                  />
                  <label
                    htmlFor="profile_picture"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border-2 border-slate-200 dark:border-slate-700 shadow-sm text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:scale-105"
                  >
                    <Upload className="h-4 w-4" />
                    Choose Photo
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    JPG, PNG or GIF (max. 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Username field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  {...register("username")}
                  type="text"
                  id="username"
                  className={cn(
                    "w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                    "dark:bg-slate-800 dark:text-slate-100",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.username
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                  )}
                  placeholder="Choose a username"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.username.message}
                </p>
              )}
            </div>

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
                    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
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
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Password
              </label>
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
                    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                    "dark:bg-slate-800 dark:text-slate-100",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.password
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                  )}
                  placeholder="Create a strong password"
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
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Password strength
                    </span>
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        passwordStrength < 50
                          ? "text-red-600 dark:text-red-400"
                          : passwordStrength < 75
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                      )}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-300 rounded-full",
                        getPasswordStrengthColor()
                      )}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className={cn(
                    "w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                    "dark:bg-slate-800 dark:text-slate-100",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.confirmPassword
                      ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                  )}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 mt-0.5 text-purple-600 focus:ring-purple-500 border-slate-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
              >
                I agree to the{" "}
                <button className="font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white",
                "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
                "shadow-lg hover:shadow-xl transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg",
                !isLoading && "hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Creating your account...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Create Account
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Switch to login */}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign in instead
          </button>
        </div>
      </div>

      {/* Footer text */}
      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        By signing up, you agree to our{" "}
        <button className="font-medium text-purple-600 dark:text-purple-400 hover:underline">
          Terms
        </button>{" "}
        and{" "}
        <button className="font-medium text-purple-600 dark:text-purple-400 hover:underline">
          Privacy Policy
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
