// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import { roomApi } from "@/services/api";
import { Room } from "@/types";
import { formatVND } from "@/lib/utils";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

export default async function HomePage() {
  // Server Component: fetch phòng mới nhất để hiển thị ở trang chủ
  let rooms: Room[] = [];
  let error = null;

  try {
    const res = await roomApi.search({}); // Lấy tất cả phòng active
    rooms = res.data.data;
  } catch (err) {
    error = "Không thể tải danh sách phòng. Vui lòng thử lại sau.";
  }

  return (
    <>
      {/* Hero Section + Tìm kiếm nhanh */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 rounded-2xl mb-12">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tìm phòng trọ nhanh – Giá tốt – An tâm
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Hàng ngàn phòng trọ chất lượng từ chủ nhà uy tín
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Nhập khu vực, quận/huyện..."
                className="pl-10 bg-white text-gray-900"
              />
            </div>
            <Button size="lg" variant="secondary">
              <Search className="mr-2 h-5 w-5" />
              Tìm kiếm
            </Button>
          </form>
        </div>
      </section>

      {/* Danh sách phòng nổi bật */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Phòng trọ nổi bật</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {!error && rooms.length === 0 && <EmptyState />}

        {!error && rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.slice(0, 6).map((room) => (
              <Link href={`/rooms/${room.id}`} key={room.id}>
                <Card className="hover:shadow-lg transition-shadow overflow-hidden">
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
                    <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                      {room.images.length} ảnh
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-2">{room.title}</CardTitle>
                    <p className="text-sm text-gray-600 flex items-center mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {room.location.district}, {room.location.province}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatVND(room.price)} <span className="text-sm font-normal text-gray-600">/tháng</span>
                    </p>
                  </CardContent>

                  <CardFooter className="text-sm text-gray-500">
                    Cọc: {formatVND(room.deposit)} • Diện tích: {room.area}m²
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