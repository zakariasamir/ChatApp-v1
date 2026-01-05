"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/_shared/contexts/AuthContext";
import { LoadingSpinner } from "@/modules/_shared/components/LoadingSpinner";
import { Shield, Lock } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true);
      // Small delay for smooth transition
      const timeout = setTimeout(() => {
        router.push("/auth");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative text-center animate-in fade-in zoom-in-95 duration-500">
          {/* Shield icon with pulse animation */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Loading spinner */}
          <LoadingSpinner size="lg" className="mx-auto mb-4" />

          {/* Text content */}
          <div className="space-y-2">
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Verifying access
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Please wait while we secure your session...
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (isRedirecting || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative text-center animate-in fade-in zoom-in-95 duration-500">
          {/* Lock icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 bg-linear-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
              <Lock className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Loading spinner */}
          <LoadingSpinner size="lg" className="mx-auto mb-4" />

          {/* Text content */}
          <div className="space-y-2">
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Authentication required
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Redirecting to sign in...
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-64 mx-auto">
            <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-amber-500 to-orange-600 rounded-full animate-[progress_1s_ease-in-out]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
