"use client";

import React, { useState } from "react";
import { LoginForm, RegisterForm } from "@/modules/auth/components";
import { MessageSquare, Users, Shield, Zap } from "lucide-react";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-pink-400/20 to-orange-400/20 dark:from-pink-600/10 dark:to-orange-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-linear-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-float-delayed"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Content container */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-12 relative z-10">
        {/* Left side - Feature highlights (hidden on mobile) */}
        <div className="hidden lg:flex flex-1 flex-col space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Connect with
              <br />
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Anyone, Anywhere
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Join thousands of users in seamless, secure conversations. Start
              chatting in seconds.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              {
                icon: MessageSquare,
                title: "Real-time Messaging",
                description: "Instant delivery with typing indicators",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                icon: Users,
                title: "Group Chats",
                description: "Create rooms and collaborate with teams",
                gradient: "from-purple-500 to-purple-600",
              },
              {
                icon: Shield,
                title: "End-to-End Encrypted",
                description: "Your messages are private and secure",
                gradient: "from-pink-500 to-pink-600",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for speed and performance",
                gradient: "from-orange-500 to-orange-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all hover:scale-105 group animate-in slide-in-from-left fade-in duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "50K+", label: "Messages/Day" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 animate-in zoom-in fade-in duration-500"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="w-full lg:w-auto lg:shrink-0">
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          className="w-full h-auto text-white/5 dark:text-slate-950/50"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default AuthForm;
