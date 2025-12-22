// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home as HomeIcon, Filter, Camera } from "lucide-react";
import Link from "next/link";
import { formatVND } from "@/lib/utils";
import { Room } from "@/types";
import { useState } from "react";

// Mock data 12 phòng (7 TP.HCM + 5 Hà Nội) - đặt trực tiếp trong page để test nhanh
const mockRooms: Room[] = [
  // TP. Hồ Chí Minh
  {
    id: "1",
    title: "Phòng trọ cao cấp đầy đủ tiện nghi Quận 7",
    description: "Phòng mới xây, nội thất cao cấp, gần ĐH Tôn Đức Thắng và RMIT. An ninh 24/7, giờ giấc tự do.",
    price: 6500000,
    deposit: 13000000,
    area: 30,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "conditioner", "tv", "kitchen", "bathroom"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Quận 7",
      ward: "Phường Tân Phú",
      address: "456 Đường Huỳnh Tấn Phát",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Nguyễn Văn Hùng", phone: "0909 888 999" },
  },
  {
    id: "2",
    title: "Phòng giá rẻ gần trung tâm Bình Thạnh",
    description: "Phòng sạch sẽ, thoáng mát, gần chợ, siêu thị. Phù hợp sinh viên, nhân viên văn phòng.",
    price: 3500000,
    deposit: 7000000,
    area: 20,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "bathroom"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Bình Thạnh",
      ward: "Phường 25",
      address: "789 Đường Điện Biên Phủ",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Nguyễn Văn Hùng", phone: "0909 888 999" },
  },
  {
    id: "3",
    title: "Studio đầy đủ nội thất Quận 1 view sông",
    description: "Studio cao cấp view sông Sài Gòn, nội thất hiện đại, gần phố đi bộ Nguyễn Huệ.",
    price: 12000000,
    deposit: 24000000,
    area: 35,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "conditioner", "tv", "kitchen", "bathroom"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
      address: "123 Nguyễn Huệ",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Trần Thị Lan", phone: "0918 777 888" },
  },
  {
    id: "4",
    title: "Phòng trọ sinh viên sạch sẽ Gò Vấp gần ĐH Công Nghiệp",
    description: "Phòng rộng rãi, giờ giấc tự do, gần chợ, siêu thị, trường đại học.",
    price: 2500000,
    deposit: 5000000,
    area: 18,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    amenities: ["wifi", "parking"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Quận Gò Vấp",
      ward: "Phường 5",
      address: "456 Quang Trung",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Lê Văn Minh", phone: "0935 123 456" },
  },
  {
    id: "5",
    title: "Phòng có ban công view đẹp Thủ Đức gần ĐH Quốc Gia",
    description: "Phòng thoáng mát, có ban công lớn, gần ĐH Quốc Gia, khu công nghệ cao.",
    price: 4500000,
    deposit: 9000000,
    area: 25,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1618221469555-7cb0b6cb8fd0?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "conditioner", "bathroom"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Thành phố Thủ Đức",
      ward: "Phường Linh Trung",
      address: "789 Xa Lộ Hà Nội",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Phạm Thị Hoa", phone: "0987 654 321" },
  },
  {
    id: "6",
    title: "Phòng cao cấp Phú Nhuận có hồ bơi, gym chung",
    description: "Căn hộ dịch vụ cao cấp trong chung cư có hồ bơi, gym, bảo vệ 24/7.",
    price: 9000000,
    deposit: 18000000,
    area: 40,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b03e7?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "conditioner", "tv", "kitchen", "bathroom"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Quận Phú Nhuận",
      ward: "Phường 2",
      address: "321 Phan Đình Phùng",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Nguyễn Văn Hùng", phone: "0909 888 999" },
  },
  {
    id: "7",
    title: "Phòng trọ bình dân Quận 12 gần khu công nghiệp",
    description: "Phòng sạch sẽ, giá rẻ, phù hợp công nhân, gần khu công nghiệp Tân Bình.",
    price: 1800000,
    deposit: 3600000,
    area: 15,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    ],
    amenities: ["parking"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Quận 12",
      ward: "Phường Tân Thới Hiệp",
      address: "567 Quốc lộ 1A",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Vũ Thị Mai", phone: "0923 456 789" },
  },

  // Hà Nội
  {
    id: "8",
    title: "Studio view Hồ Gươm Hoàn Kiếm đầy đủ nội thất",
    description: "Studio cao cấp ngay trung tâm, view Hồ Gươm tuyệt đẹp, nội thất hiện đại.",
    price: 15000000,
    deposit: 30000000,
    area: 40,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "conditioner", "tv", "kitchen", "bathroom"],
    location: {
      province: "Hà Nội",
      district: "Quận Hoàn Kiếm",
      ward: "Phường Hàng Bạc",
      address: "56 Hàng Bông",
    },
    ownerId: "2",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Hoàng Văn Nam", phone: "0988 123 456" },
  },
  {
    id: "9",
    title: "Phòng trọ sinh viên Cầu Giấy gần ĐH Quốc Gia Hà Nội",
    description: "Phòng sạch sẽ, giờ giấc tự do, gần các trường đại học.",
    price: 2200000,
    deposit: 4400000,
    area: 16,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    amenities: ["wifi", "parking"],
    location: {
      province: "Hà Nội",
      district: "Quận Cầu Giấy",
      ward: "Phường Dịch Vọng",
      address: "123 Xuân Thủy",
    },
    ownerId: "2",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Nguyễn Thị Lan", phone: "0912 345 678" },
  },
  {
    id: "10",
    title: "Phòng gác xép rộng rãi Đống Đa gần chợ Đồng Xuân",
    description: "Phòng có gác xép ngủ, bếp riêng, WC riêng. Gần chợ, siêu thị.",
    price: 3800000,
    deposit: 7600000,
    area: 25,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "kitchen", "bathroom"],
    location: {
      province: "Hà Nội",
      district: "Quận Đống Đa",
      ward: "Phường Văn Miếu",
      address: "89 Thái Hà",
    },
    ownerId: "2",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Trần Văn Hùng", phone: "0904 567 890" },
  },
  {
    id: "11",
    title: "Căn hộ dịch vụ cao cấp Ba Đình gần Lăng Bác",
    description: "Căn hộ dịch vụ sang trọng, nội thất đầy đủ, có bảo vệ 24/7.",
    price: 18000000,
    deposit: 36000000,
    area: 60,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b03e7?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "conditioner", "tv", "kitchen", "bathroom"],
    location: {
      province: "Hà Nội",
      district: "Quận Ba Đình",
      ward: "Phường Điện Biên",
      address: "45 Điện Biên Phủ",
    },
    ownerId: "2",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Lê Thị Hồng", phone: "0977 888 999" },
  },
  {
    id: "12",
    title: "Phòng trọ giá rẻ Long Biên gần Aeon Mall",
    description: "Phòng sạch sẽ, thoáng mát, gần Aeon Mall, cầu Vĩnh Tuy.",
    price: 2800000,
    deposit: 5600000,
    area: 20,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "bathroom"],
    location: {
      province: "Hà Nội",
      district: "Quận Long Biên",
      ward: "Phường Gia Thụy",
      address: "234 Nguyễn Văn Cừ",
    },
    ownerId: "2",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Phạm Văn Tuấn", phone: "0936 789 012" },
  },
];

const amenitiesList = [
  { id: "wifi", label: "Wifi" },
  { id: "parking", label: "Chỗ để xe" },
  { id: "conditioner", label: "Điều hòa" },
  { id: "tv", label: "TV" },
  { id: "kitchen", label: "Bếp nấu" },
  { id: "bathroom", label: "WC riêng" },
];

const provinces = [
  { value: "hcm", label: "TP. Hồ Chí Minh" },
  { value: "hn", label: "Hà Nội" },
  { value: "dn", label: "Đà Nẵng" },
  { value: "hp", label: "Hải Phòng" },
];

const districtsByProvince: Record<string, string[]> = {
  hcm: [
    "Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 10", "Quận 11", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình", "Thành phố Thủ Đức"
  ],
  hn: [
    "Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Đống Đa", "Quận Hai Bà Trưng", "Quận Cầu Giấy", "Quận Thanh Xuân", "Quận Hoàng Mai", "Quận Long Biên"
  ],
  dn: [
    "Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Liên Chiểu"
  ],
  hp: [
    "Quận Hồng Bàng", "Quận Ngô Quyền", "Quận Lê Chân", "Quận Hải An", "Quận Kiến An"
  ],
};

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Filter rooms theo state form (realtime)
  const filteredRooms = mockRooms.filter((room) => {
    const matchesKeyword = !keyword || 
      room.title.toLowerCase().includes(keyword.toLowerCase()) ||
      room.description.toLowerCase().includes(keyword.toLowerCase());

    const matchesProvince = !selectedProvince || 
      room.location.province.toLowerCase().includes(selectedProvince.toLowerCase());

    const matchesDistrict = !selectedDistrict || 
      room.location.district.toLowerCase().includes(selectedDistrict.toLowerCase());

    const matchesPrice = 
      (!minPrice || room.price >= Number(minPrice)) &&
      (!maxPrice || room.price <= Number(maxPrice));

    const matchesArea = 
      (!minArea || room.area >= Number(minArea)) &&
      (!maxArea || room.area <= Number(maxArea));

    const matchesAmenities = selectedAmenities.length === 0 || 
      selectedAmenities.every(amenity => room.amenities.includes(amenity));

    return matchesKeyword && matchesProvince && matchesDistrict && matchesPrice && matchesArea && matchesAmenities;
  });

  return (
    <>
      {/* Hero + Tìm kiếm nâng cao */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tìm phòng trọ nhanh – Giá tốt – An tâm
            </h1>
            <p className="text-xl opacity-90">
              Hàng ngàn phòng trọ chất lượng từ chủ nhà uy tín
            </p>
          </div>

          {/* Form tìm kiếm nâng cao */}
          <form className="bg-white rounded-2xl shadow-2xl p-8 -mb-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Label htmlFor="keyword" className="text-gray-700 mb-2 block">Từ khóa</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="keyword"
                    placeholder="Tìm theo tên phòng, mô tả..."
                    className="pl-10 bg-white text-gray-900 placeholder:text-gray-500"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="province" className="text-gray-700 mb-2 block">Tỉnh/Thành phố</Label>
                <Select 
                  value={selectedProvince}
                  onValueChange={(value) => {
                    setSelectedProvince(value);
                    setSelectedDistrict("");
                  }}
                >
                  <SelectTrigger className="bg-white text-gray-900">
                    <SelectValue placeholder="Chọn tỉnh/thành" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((prov) => (
                      <SelectItem key={prov.value} value={prov.value}>
                        {prov.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district" className="text-gray-700 mb-2 block">Quận/Huyện</Label>
                <Select 
                  value={selectedDistrict}
                  onValueChange={(value) => setSelectedDistrict(value)}
                  disabled={!selectedProvince}
                >
                  <SelectTrigger className="bg-white text-gray-900">
                    <SelectValue placeholder="Chọn quận/huyện" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProvince && districtsByProvince[selectedProvince] ? (
                      districtsByProvince[selectedProvince].map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        Chọn tỉnh/thành trước
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Khoảng giá + diện tích + Tìm kiếm */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label className="text-gray-700 mb-2 block">Khoảng giá (VND/tháng)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Từ"
                    className="bg-white text-gray-900 placeholder:text-gray-500"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Đến"
                    className="bg-white text-gray-900 placeholder:text-gray-500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-700 mb-2 block">Diện tích (m²)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Từ"
                    className="bg-white text-gray-900 placeholder:text-gray-500"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Đến"
                    className="bg-white text-gray-900 placeholder:text-gray-500"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                  />
                </div>
              </div>

              <div className="self-end">
                <Button type="submit" size="lg" className="w-full">
                  <Filter className="mr-2 h-5 w-5" />
                  Tìm kiếm
                </Button>
              </div>
            </div>

            {/* Tiện ích */}
            <div>
              <Label className="text-gray-700 mb-4 block">Tiện ích mong muốn</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {amenitiesList.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={amenity.id}
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAmenities([...selectedAmenities, amenity.id]);
                        } else {
                          setSelectedAmenities(selectedAmenities.filter(a => a !== amenity.id));
                        }
                      }}
                    />
                    <label
                      htmlFor={amenity.id}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Kết quả tìm kiếm + card đẹp */}
      <section className="container mx-auto px-4 py-20 pt-32">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            Kết quả tìm kiếm ({filteredRooms.length} phòng)
          </h2>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="text-center py-20">
            <HomeIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Không tìm thấy phòng nào phù hợp</p>
            <p className="text-gray-500 mt-2">Thử thay đổi tiêu chí tìm kiếm</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <Link href={`/rooms/${room.id}`} key={room.id}>
                <Card className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="aspect-video relative">
                    {room.images[0] ? (
                      <img
                        src={room.images[0]}
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <HomeIcon className="w-20 h-20 text-gray-400" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                      <Camera className="w-4 h-4" />
                      {room.images.length} ảnh
                    </div>

                    <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                      {formatVND(room.price)}/tháng
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-2 text-xl group-hover:text-blue-600 transition-colors">
                      {room.title}
                    </CardTitle>
                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="text-base">
                        {room.location.district}, {room.location.province}
                      </span>
                    </p>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Cọc: {formatVND(room.deposit)}</span>
                      <span>{room.area}m²</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}