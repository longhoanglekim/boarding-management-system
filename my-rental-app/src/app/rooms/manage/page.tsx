// src/app/rooms/manage/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, EyeOff, PlusCircle } from "lucide-react";
import { roomApi } from "@/services/api";
import { Room } from "@/types";
import { formatVND } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Home } from "lucide-react";

export default function ManageRoomsPage() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await roomApi.myRooms();
        if (res.data?.data) {
          setRooms(res.data.data);
        }
      } catch (err) {
        toast.error("Không thể tải danh sách phòng của bạn");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "owner") {
      fetchRooms();
    }
  }, [user]);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Bạn có chắc muốn xóa phòng "${title}"?`)) {
      // Giả lập xóa
      setRooms(prev => prev.filter(r => r.id !== id));
      toast.success(`Đã xóa phòng "${title}"`);
    }
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    setRooms(prev =>
      prev.map(r => r.id === id ? { ...r, isActive: !currentStatus } : r)
    );
    toast.success(currentStatus ? "Đã ẩn phòng" : "Đã hiển thị phòng trở lại");
  };

  if (!user) {
    return <div className="text-center py-20">Đang tải...</div>;
  }

  if (user.role !== "owner") {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Bạn không có quyền truy cập trang này</p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Quay về trang chủ</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20">Đang tải danh sách phòng...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quản lý phòng trọ</h1>
        <Link href="/rooms/create">
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" />
            Đăng phòng mới
          </Button>
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20">
          <Home className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Bạn chưa có phòng nào</p>
          <Link href="/rooms/create">
            <Button className="mt-6" size="lg">
              <PlusCircle className="mr-2 h-5 w-5" />
              Đăng phòng đầu tiên
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-gray-200">
                {room.images[0] ? (
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge variant={room.isActive ? "default" : "secondary"}>
                    {room.isActive ? "Đang hiển thị" : "Đã ẩn"}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge>{room.images.length} ảnh</Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{room.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  {room.location.district}, {room.location.province}
                </p>
              </CardHeader>

              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  {formatVND(room.price)} <span className="text-sm font-normal text-gray-600">/tháng</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Cọc: {formatVND(room.deposit)} • {room.area}m²
                </p>
              </CardContent>

              <CardFooter className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleActive(room.id, room.isActive)}
                >
                  {room.isActive ? (
                    <>
                      <EyeOff className="mr-1 h-4 w-4" />
                      Ẩn
                    </>
                  ) : (
                    <>
                      <Eye className="mr-1 h-4 w-4" />
                      Hiển thị
                    </>
                  )}
                </Button>

                <Link href={`/rooms/${room.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-4 w-4" />
                    Sửa
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(room.id, room.title)}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Xóa
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}