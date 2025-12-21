// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import { formatVND } from "@/lib/utils";
import { roomApi } from "@/services/api";
import { Room } from "@/types";

export default async function HomePage() {
  let rooms: Room[] = [];

  try {
    const res = await roomApi.search();
    if (res.data?.data) {
      rooms = res.data.data;
    }
  } catch (err) {
    console.error("Error fetching rooms:", err);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 rounded-2xl mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tìm phòng trọ nhanh – Giá tốt – An tâm
          </h1>
          <p className="text-xl mb-10 opacity-90">
            Hàng ngàn phòng trọ chất lượng từ chủ nhà uy tín
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Nhập khu vực, quận/huyện..."
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <Button size="lg">
                <Search className="mr-2 h-5 w-5" />
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Phòng nổi bật */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Phòng trọ nổi bật</h2>

        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <HomeIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Chưa có phòng trọ nào</p>
            <p className="text-gray-500 mt-2">Chủ trọ hãy đăng phòng đầu tiên!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Link href={`/rooms/${room.id}`} key={room.id}>
                <Card className="hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
                  <div className="aspect-video relative bg-gray-200">
                    {room.images[0] ? (
                      <img
                        src={room.images[0]}
                        alt={room.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <HomeIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {room.images.length} ảnh
                    </div>
                  </div>

                  <CardHeader className="flex-1">
                    <CardTitle className="line-clamp-2 text-lg">{room.title}</CardTitle>
                    <p className="text-sm text-gray-600 flex items-center mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {room.location.district}, {room.location.province}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatVND(room.price)}
                      <span className="text-sm font-normal text-gray-600"> /tháng</span>
                    </p>
                  </CardContent>

                  <CardFooter className="text-sm text-gray-500 justify-between">
                    <span>Cọc: {formatVND(room.deposit)}</span>
                    <span>{room.area}m²</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}