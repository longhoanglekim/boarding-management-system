// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Thêm import này
import { toast } from "sonner";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter(); // Dùng để redirect
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      toast.success("Đăng nhập thành công! Đang chuyển đến Dashboard...");
      // Redirect về Dashboard sau khi login thành công
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
          <CardDescription className="text-center">
            Nhập email và mật khẩu để truy cập
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="owner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Gõ 'owner' để test chủ trọ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-gray-600 text-center">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
          <div className="text-xs text-gray-500 text-center">
            Tip: Mật khẩu chứa chữ "owner" → giao diện chủ trọ<br />
            Không chứa → giao diện người thuê
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}