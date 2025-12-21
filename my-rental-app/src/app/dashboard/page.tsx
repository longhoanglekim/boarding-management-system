// src/app/dashboard/page.tsx
"use client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, FileText, PlusCircle, DollarSign, Users, Building2, Calendar,Bell } from "lucide-react"; // Thêm Calendar ở đây
import Link from "next/link";
import { formatVND } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-20">Đang tải...</div>;
  }

  const isOwner = user.role === "owner";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Chào mừng trở lại, {user.name || user.email}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {isOwner ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng phòng</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+2 so với tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Phòng đang cho thuê</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">60% công suất</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doanh thu tháng này</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatVND(19500000)}</div>
                <p className="text-xs text-muted-foreground">+20% so với tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hợp đồng mới</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Trong tuần này</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hợp đồng hiện tại</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Hiệu lực đến 01/06/2026</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tiền thuê tháng này</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatVND(5000000)}</div>
                <p className="text-xs text-green-600">Đã thanh toán</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Phòng đang ở</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Phòng 301</div>
                <p className="text-xs text-muted-foreground">Quận 7, TP.HCM</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hạn thanh toán tiếp theo</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25/01/2026</div>
                <p className="text-xs text-muted-foreground">{formatVND(5000000)}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isOwner ? (
          <>
            <Link href="/rooms/create">
              <Button className="w-full h-24 flex flex-col items-center justify-center gap-3">
                <PlusCircle className="h-8 w-8" />
                <span className="text-lg">Đăng phòng mới</span>
              </Button>
            </Link>
            <Link href="/rooms/manage">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-3">
                <Building2 className="h-8 w-8" />
                <span className="text-lg">Quản lý phòng</span>
              </Button>
            </Link>
            <Link href="/contracts">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-3">
                <FileText className="h-8 w-8" />
                <span className="text-lg">Xem hợp đồng</span>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/contracts">
              <Button className="w-full h-24 flex flex-col items-center justify-center gap-3">
                <FileText className="h-8 w-8" />
                <span className="text-lg">Xem hợp đồng</span>
              </Button>
            </Link>
            <Link href="/rooms">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-3">
                <Home className="h-8 w-8" />
                <span className="text-lg">Tìm phòng mới</span>
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-3">
                <Bell className="h-8 w-8" />
                <span className="text-lg">Thông báo</span>
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}