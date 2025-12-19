// src/components/layout/Navbar.tsx
'use client';

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
import { Home, Search, PlusCircle, FileText, Bell, LogOut, User, Settings } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Trang chủ */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              TT
            </div>
            <span className="font-bold text-xl hidden sm:block">Thuê Trọ Việt</span>
          </Link>

          {/* Menu chính (khi đã login) */}
          {user && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <Home className="w-5 h-5" />
                <span>Trang chủ</span>
              </Link>

              {user.role === 'owner' && (
                <>
                  <Link href="/rooms/create" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                    <PlusCircle className="w-5 h-5" />
                    <span>Đăng phòng</span>
                  </Link>
                  <Link href="/rooms/manage" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                    <Settings className="w-5 h-5" />
                    <span>Quản lý phòng</span>
                  </Link>
                </>
              )}

              <Link href="/contracts" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <FileText className="w-5 h-5" />
                <span>Hợp đồng</span>
              </Link>

              <Link href="/notifications" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <Bell className="w-5 h-5" />
                <span>Thông báo</span>
              </Link>
            </nav>
          )}

          {/* Right side: Login/Register hoặc Avatar */}
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
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-blue-600 font-medium capitalize">{user.role === 'owner' ? 'Chủ trọ' : 'Người thuê'}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Hồ sơ cá nhân
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
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