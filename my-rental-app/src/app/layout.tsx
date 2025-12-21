// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thuê Trọ Việt - Quản lý thuê trọ hiện đại",
  description: "Hệ thống quản lý thuê trọ với microservices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </main>
          <Toaster richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}