// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Home, PlusCircle, FileText, LogOut, User, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const { user, logout, loading, unreadCount } = useAuth();

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              TT
            </div>
            <span className="font-bold text-xl hidden sm:inline">Thuê Trọ Việt</span>
          </Link>

          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <Home className="w-5 h-5" />
                Trang chủ
              </Link>

              {user.role === "owner" && (
                <>
                  <Link href="/rooms/create" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <PlusCircle className="w-5 h-5" />
                    Đăng phòng
                  </Link>
                  <Link href="/rooms/manage" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <Building2 className="w-5 h-5" />
                    Quản lý phòng
                  </Link>
                </>
              )}

              <Link href="/contracts" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <FileText className="w-5 h-5" />
                Hợp đồng
              </Link>

              <Link href="/notifications" className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <Bell className="w-5 h-5" />
                Thông báo
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-4 px-2 py-0.5 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link href="/login">
                  <Button variant="ghost">Đăng nhập</Button>
                </Link>
                <Link href="/register">
                  <Button>Đăng ký</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs capitalize text-blue-600">
                        {user.role === "owner" ? "Chủ trọ" : "Người thuê"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Hồ sơ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}