// src/components/contract/CreateContractForm.tsx
"use client";

import { useContractStore } from "@/store/useContractStore";
import { Room } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function CreateContractForm({ room }: { room: Room }) {
  const addRequest = useContractStore((state) => state.addRequest);

  const handleSubmit = () => {
    // BỎ HOÀN TOÀN KIỂM TRA USER/ROLE → AI CŨNG GỬI ĐƯỢC
    const newRequest = {
      id: Date.now().toString(),
      roomId: room.id,
      roomTitle: room.title,
      renterName: "Người thuê demo", // fake tên
      renterEmail: "demo@renter.com",
      renterPhone: "090x xxx xxx",
      message: "Tôi muốn thuê phòng này (demo bảo vệ đồ án). Mong chủ trọ liên hệ sớm!",
      createdAt: new Date().toISOString(),
    };

    addRequest(newRequest);
    toast.success("Đã gửi yêu cầu thuê phòng thành công! (Demo)");
  };

  return (
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

        <Button 
          onClick={handleSubmit} 
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 font-semibold"
        >
          Gửi yêu cầu thuê ngay (Demo)
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          (Demo bảo vệ đồ án - click là gửi, không cần đăng nhập)
        </p>
      </CardContent>
    </Card>
  );
}