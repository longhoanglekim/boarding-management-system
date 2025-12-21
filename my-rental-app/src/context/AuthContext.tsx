// src/context/AuthContext.tsx
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { User, Notification } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  notifications: Notification[];
  unreadCount: number;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  markNotificationRead: (id: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập load user và notifications khi khởi động app
    setTimeout(() => {
      const fakeUser: User = {
        id: "1",
        email: "owner@example.com",
        name: "Nguyễn Văn Chủ Trọ",
        role: "renter", // Đổi thành "renter" để test giao diện người thuê
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      const fakeNotifications: Notification[] = [
        {
          id: "1",
          title: "Hợp đồng mới",
          message: "Người thuê Trần Thị B đã ký hợp đồng HD001",
          type: "success",
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Thanh toán tháng này",
          message: "Hợp đồng HD002 chưa thanh toán tháng 12",
          type: "warning",
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Tin đăng được duyệt",
          message: "Phòng 'Phòng cao cấp Quận 7' đã được duyệt",
          type: "info",
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ];

      setUser(fakeUser);
      setNotifications(fakeNotifications);
      setLoading(false);
    }, 600);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setUser({
      id: "1",
      email,
      name: email.split("@")[0],
      role: password.includes("owner") ? "owner" : "renter",
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    toast.success("Đăng nhập thành công!");
    return true;
  };

  const register = async (data: any): Promise<boolean> => {
    toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.success("Đăng xuất thành công!");
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        notifications,
        unreadCount,
        login,
        register,
        logout,
        markNotificationRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}