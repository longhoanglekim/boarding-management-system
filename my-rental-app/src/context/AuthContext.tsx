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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // ================== INIT ==================
  useEffect(() => {
    // ❗ KHÔNG auto login
    // Chỉ kiểm tra xong là hết loading
    setLoading(false);
  }, []);

  // ================== LOGIN ==================
  // ================== LOGIN ==================
// ================== LOGIN ==================
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    // === FAKE LOGIN ĐẶC BIỆT CHO DEMO / BÁO CÁO ===
    if (email === "nguyenhung@gmail.com" && password === "Hung123") {
      // Giả lập response thành công từ server
      const fakeData = {
        accessToken: "fake-jwt-token-for-owner-demo-2025",
        email: "nguyenhung@gmail.com",
        fullName: "Nguyễn Văn Hùng",
        role: "OWNER", // Quyền chủ trọ
      };

      localStorage.setItem("accessToken", fakeData.accessToken);

      setUser({
        id: "1",
        email: fakeData.email,
        fullName: fakeData.fullName,
        role: "owner", // role lowercase để đồng bộ với hệ thống
        isActive: true,
        createdAt: new Date().toISOString(),
      });

      toast.success("Đăng nhập thành công! (Demo Owner Account)");
      return true;
    }

    // === ĐĂNG NHẬP THẬT QUA API (các tài khoản khác) ===
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      if (res.status === 400) {
        toast.error("Tài khoản không tồn tại");
        return false;
      }
      if (res.status === 423) {
        toast.error("Tài khoản chưa được xác thực. Vui lòng kiểm tra email.");
        return false;
      }
      if (res.status === 401) {
        toast.error("Sai mật khẩu.");
        return false;
      }
      toast.error("Server bị lỗi. Vui lòng đăng nhập sau.");
      return false;
    }

    const result = await res.json();
    const data = result.data;

    localStorage.setItem("accessToken", data.accessToken);

    setUser({
      id: "1",
      email: data.email,
      fullName: data.fullName || data.email.split("@")[0],
      role: data.role?.toLowerCase() || "renter",
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    toast.success("Đăng nhập thành công!");
    return true;
  } catch (error) {
    toast.error("Không thể kết nối đến server. Vui lòng thử lại sau.");
    return false;
  }
};

  const register = async (data: any): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log("REGISTER RESPONSE:", res.status, result);

      if (!res.ok) {
        if (res.status === 423) {
          toast.warning("Email chưa được xác thực. Vui lòng kiểm tra email.");
          return false;
        }

        if (res.status === 409) {
          toast.error("Email đã tồn tại.");
          return false;
        }

        toast.error(result.message || "Đăng ký thất bại");
        return false;
      }

      toast.success("Đăng ký thành công! Vui lòng kiểm tra email.");
      return true;
    } catch (err) {
      console.error("REGISTER FETCH FAILED", err);
      toast.error("Không kết nối được server");
      return false;
    }
  };


  // ================== LOGOUT ==================
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    toast.success("Đăng xuất thành công!");
  };

  // ================== NOTIFICATION ==================
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
