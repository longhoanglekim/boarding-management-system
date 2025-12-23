// src/app/notifications/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useContractStore } from "@/store/useContractStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect } from "react";

export default function NotificationsPage() {
  const { user } = useAuth();
  const { requests, acceptRequest, rejectRequest, renterNotifications, addRequest } = useContractStore();

  // === FAKE YÊU CẦU CÓ SẴN CHO OWNER – CHỈ CHẠY 1 LẦN ===
  useEffect(() => {
    if (user?.role === "owner" && requests.length === 0) {
      // Kiểm tra xem đã có fake request nào chưa (dựa vào id bắt đầu bằng "fake-")
      const hasFakeRequests = requests.some((r) => r.id.startsWith("fake-"));
      if (hasFakeRequests) return; // Đã có rồi → không add nữa

      addRequest({
        id: "fake-req-1",
        roomId: "1",
        roomTitle: "Phòng trọ cao cấp đầy đủ tiện nghi Quận 7",
        renterName: "Trần Văn A",
        renterEmail: "tranvana@gmail.com",
        renterPhone: "0908 123 456",
        message: "Em muốn thuê phòng này từ tháng 1/2026. Anh/chị liên hệ em nhé!",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      });

      addRequest({
        id: "fake-req-2",
        roomId: "3",
        roomTitle: "Phòng trọ cao cấp đầy đủ tiện nghi Quận 7",
        renterName: "Hoàng Lê Kim Long",
        renterEmail: "hlklonga5@gmail.com",
        renterPhone: "0856 850486",
        message: "Em muốn thuê phòng này ạ",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      });

      addRequest({
        id: "fake-req-3",
        roomId: "2",
        roomTitle: "Phòng trọ cao cấp đầy đủ tiện nghi Quận 7",
        renterName: "Lê Thị C",
        renterEmail: "lethic@example.com",
        renterPhone: "0913 456 789",
        message: "Phòng đẹp, em quan tâm giá và xem nhà được không ạ?",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      });
    }
  }, [user?.role, requests.length, addRequest]); // dependencies ổn định hơn

  if (!user) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Bell className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <p className="text-xl text-gray-600">Vui lòng đăng nhập để xem thông báo</p>
        <Link href="/login">
          <Button className="mt-4">Đăng nhập</Button>
        </Link>
      </div>
    );
  }

  // OWNER VIEW
  if (user.role === "owner") {
    const pendingCount = requests.filter((r) => r.status === "pending").length;

    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Bell className="w-10 h-10 text-blue-600" />
          Yêu cầu thuê phòng
        </h1>

        {pendingCount > 0 && (
          <Badge variant="destructive" className="mb-6 text-lg px-4 py-2">
            {pendingCount} yêu cầu mới
          </Badge>
        )}

        {requests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-20">
              <p className="text-xl text-gray-600">Chưa có yêu cầu thuê phòng nào</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <Card key={req.id}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{req.roomTitle}</h3>
                  <p><strong>Người thuê:</strong> {req.renterName} ({req.renterEmail})</p>
                  <p><strong>SĐT:</strong> {req.renterPhone}</p>
                  <p className="italic mt-3 text-gray-700">"{req.message}"</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(req.createdAt).toLocaleString("vi-VN")}
                  </p>

                  {req.status === "pending" && (
                    <div className="mt-6 flex gap-4">
                      <Button
                        onClick={() => {
                          acceptRequest(req.id);
                          toast.success("Đã chấp nhận hợp đồng!");
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Chấp nhận
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          rejectRequest(req.id);
                          toast.info("Đã từ chối hợp đồng");
                        }}
                      >
                        <XCircle className="mr-2 h-5 w-5" />
                        Từ chối
                      </Button>
                    </div>
                  )}

                  {req.status !== "pending" && (
                    <Badge className={req.status === "accepted" ? "bg-green-600" : "bg-red-600"}>
                      {req.status === "accepted" ? "Đã chấp nhận" : "Đã từ chối"}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // RENTER VIEW
  const unreadCount = renterNotifications.filter((n) => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Bell className="w-10 h-10 text-blue-600" />
        Thông báo của bạn
      </h1>

      {unreadCount > 0 && (
        <Badge variant="default" className="mb-6 text-lg px-4 py-2">
          {unreadCount} thông báo mới
        </Badge>
      )}

      {renterNotifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-20">
            <p className="text-xl text-gray-600">Chưa có thông báo nào</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {renterNotifications.map((noti) => (
            <Card key={noti.id}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">{noti.title}</h3>
                <p className="text-gray-700">{noti.message}</p>
                <p className="text-sm text-gray-500 mt-4">
                  {new Date(noti.createdAt).toLocaleString("vi-VN")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}