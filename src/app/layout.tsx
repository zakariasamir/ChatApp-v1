import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/modules/_shared/contexts/AuthContext";
import { ChatProvider } from "@/modules/_shared/contexts/ChatContext";
import { SWRProvider } from "@/modules/_shared/providers/SWRProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatApp - Real-time Chat Application",
  description:
    "A modern real-time chat application built with Next.js and Socket.IO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRProvider>
          <AuthProvider>
            <ChatProvider>{children}</ChatProvider>
          </AuthProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
