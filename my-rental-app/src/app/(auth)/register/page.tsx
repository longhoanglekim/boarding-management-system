// src/app/(auth)/register/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({});
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Đăng ký tài khoản</CardTitle>
          <CardDescription className="text-center">
            Tạo tài khoản mới để sử dụng hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ tên</Label>
              <Input id="name" placeholder="Nguyễn Văn A" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="0909 123 456" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Đăng ký
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-600 text-center w-full">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Đăng nhập
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}