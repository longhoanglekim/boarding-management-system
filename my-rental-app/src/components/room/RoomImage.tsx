// src/components/room/RoomImage.tsx
"use client";

import Image from "next/image";
import { Home } from "lucide-react";

interface RoomImageProps {
  src: string;
  alt: string;
}

export default function RoomImage({ src, alt }: RoomImageProps) {
  return (
    <div className="aspect-video relative bg-gray-200 rounded-xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        unoptimized // Bắt buộc với ảnh external (Unsplash)
        onError={(e) => {
          const img = e.currentTarget;
          img.src = ""; // Xóa src ảnh lỗi
          img.style.display = "none"; // Ẩn thẻ img

          const container = img.parentElement;
          if (container) {
            container.classList.add("flex", "items-center", "justify-center");
            container.style.backgroundColor = "#e5e7eb"; // Đổi nền xám nhạt
          }
        }}
      />
      {/* Fallback icon khi ảnh lỗi */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Home className="w-16 h-16 text-gray-400" />
      </div>
    </div>
  );
}