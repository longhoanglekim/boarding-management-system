// src/app/rooms/create/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Upload } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const amenitiesList = [
  { id: "wifi", label: "Wifi" },
  { id: "parking", label: "Chỗ để xe" },
  { id: "conditioner", label: "Điều hòa" },
  { id: "tv", label: "TV" },
  { id: "kitchen", label: "Bếp nấu" },
  { id: "bathroom", label: "WC riêng" },
];

export default function CreateRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = [...images, ...files].slice(0, 10); // Giới hạn 10 ảnh
      const newPreviews = newImages.map(file => URL.createObjectURL(file));

      setImages(newImages);
      setPreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    // Giả lập gọi API đăng phòng (dùng delay để giống thật)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Giả lập thành công
    toast.success(`Đăng phòng "${title}" thành công với ${images.length} ảnh! Phòng đang chờ duyệt.`);

    setLoading(false);

    // Redirect về trang quản lý phòng
    router.push("/rooms/manage");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Đăng phòng trọ mới</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề phòng *</Label>
                <Input id="title" name="title" placeholder="Phòng trọ cao cấp Quận 7 đầy đủ tiện nghi" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Giá thuê/tháng (VND) *</Label>
                  <Input id="price" name="price" type="number" placeholder="6500000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Tiền cọc (VND) *</Label>
                  <Input id="deposit" name="deposit" type="number" placeholder="13000000" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Diện tích (m²) *</Label>
                <Input id="area" name="area" type="number" placeholder="30" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả chi tiết *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Phòng mới xây, nội thất cao cấp, gần trường đại học..."
                  rows={6}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Địa chỉ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="province">Tỉnh/Thành phố *</Label>
                <Input id="province" name="province" placeholder="TP. Hồ Chí Minh" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">Quận/Huyện *</Label>
                <Input id="district" name="district" placeholder="Quận 7" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward">Phường/Xã</Label>
                <Input id="ward" name="ward" placeholder="Phường Tân Phú" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Số nhà, đường *</Label>
                <Input id="address" name="address" placeholder="456 Đường Nguyễn Văn Linh" required />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tiện ích */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tiện ích có sẵn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {amenitiesList.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                  />
                  <label
                    htmlFor={amenity.id}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload ảnh thật + preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ảnh phòng (tối đa 10 ảnh)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Kéo thả ảnh vào đây hoặc click để chọn</p>
                <p className="text-sm text-gray-500">Hỗ trợ JPG, PNG (tối đa 10 ảnh)</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {previews.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-4">
                    Đã chọn {previews.length} ảnh:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={loading || images.length === 0}>
            {loading ? "Đang đăng phòng..." : "Đăng phòng"}
          </Button>
        </div>
      </form>
    </div>
  );
}