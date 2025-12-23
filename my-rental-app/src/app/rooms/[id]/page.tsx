// src/app/rooms/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roomApi } from "@/services/api";
import { Room } from "@/types";
import { formatVND } from "@/lib/utils";
import {
  MapPin,
  Home,
  Users,
  Phone,
  Mail,
  Wifi,
  Car,
  Snowflake,
  Tv,
  Bath,
  Utensils,
  User as UserIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import RoomImage from "@/components/room/RoomImage";
import { useContractStore } from "@/store/useContractStore";
import { toast } from "sonner";

export default function RoomDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  const addRequest = useContractStore((state) => state.addRequest);

  const handleSendRequest = () => {
    if (!room) return;

    const newRequest = {
      id: Date.now().toString(),
      roomId: room.id,
      roomTitle: room.title,
      renterName: "Người thuê demo",
      renterEmail: "demo@renter.com",
      renterPhone: "090x xxx xxx",
      message: "Tôi muốn thuê phòng này (demo bảo vệ đồ án). Mong chủ trọ liên hệ sớm!",
      createdAt: new Date().toISOString(),
    };

    addRequest(newRequest);
    toast.success("Đã gửi yêu cầu thuê phòng thành công! (Demo)");
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await roomApi.getById(id);
        if (res.data?.data) {
          setRoom(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching room:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return <div className="text-center py-20">Đang tải...</div>;
  if (!room) return <div className="text-center py-20 text-red-600">Không tìm thấy phòng</div>;

  const amenitiesIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="w-5 h-5" />,
    parking: <Car className="w-5 h-5" />,
    conditioner: <Snowflake className="w-5 h-5" />,
    tv: <Tv className="w-5 h-5" />,
    bathroom: <Bath className="w-5 h-5" />,
    kitchen: <Utensils className="w-5 h-5" />,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Carousel */}
      <div className="mb-10">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {room.images.map((image, index) => (
              <CarouselItem key={index}>
                <RoomImage src={image} alt={`${room.title} - ảnh ${index + 1}`} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="text-center text-sm text-gray-600 mt-4">{room.images.length} ảnh</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{room.title}</h1>
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{room.location.address}, {room.location.district}, {room.location.province}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{formatVND(room.price)}</p>
                <p className="text-sm text-gray-600">Giá thuê/tháng</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{formatVND(room.deposit)}</p>
                <p className="text-sm text-gray-600">Tiền cọc</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{room.area}m²</p>
                <p className="text-sm text-gray-600">Diện tích</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold flex items-center justify-center">
                  <Users className="w-5 h-5 mr-1" /> 1-2 người
                </p>
                <p className="text-sm text-gray-600">Số người ở</p>
              </div>
            </div>

            <Separator />

            <div className="my-8">
              <h2 className="text-2xl font-bold mb-4">Mô tả</h2>
              <p className="text-gray-700 leading-relaxed">{room.description}</p>
            </div>

            <Separator />

            <div className="my-8">
              <h2 className="text-2xl font-bold mb-4">Tiện ích</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {amenitiesIcons[amenity] || <Home className="w-5 h-5" />}
                    </div>
                    <span className="capitalize">
                      {amenity === "conditioner" ? "Điều hòa" : amenity === "parking" ? "Chỗ để xe" : amenity === "bathroom" ? "WC riêng" : amenity === "kitchen" ? "Bếp nấu" : amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FORM GỬI YÊU CẦU – LUÔN HIỆN */}
          <Card className="mt-12 border-blue-300 bg-blue-50 rounded-xl shadow-md">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Gửi yêu cầu thuê phòng</h2>
              <p className="text-gray-700 mb-4">
                Phòng: <strong>{room.title}</strong>
              </p>
              <p className="text-gray-600 mb-8">
                Giá thuê: <strong>{new Intl.NumberFormat("vi-VN").format(room.price)} ₫/tháng</strong> • 
                Tiền cọc: <strong>{new Intl.NumberFormat("vi-VN").format(room.deposit)} ₫</strong>
              </p>

              <Button onClick={handleSendRequest} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 font-semibold">
                Gửi yêu cầu thuê ngay (Demo)
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                (Demo bảo vệ đồ án - click là gửi)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{room.owner?.name || "Chủ trọ"}</p>
                  <p className="text-sm text-gray-600">Chủ nhà uy tín</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Gọi {room.owner?.phone || "0909 123 456"}
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Nhắn tin Zalo
                </Button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Đăng ngày: {new Date(room.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}