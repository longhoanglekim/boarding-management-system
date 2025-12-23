// src/app/notifications/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useContractStore } from "@/store/useContractStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function NotificationsPage() {
  const { user } = useAuth();
  const { requests, acceptRequest, rejectRequest, renterNotifications } = useContractStore();

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
              <p className="text-xl text-gray-600">Chưa có yêu cầu nào</p>
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
                  <p className="italic mt-3">"{req.message}"</p>

                  {req.status === "pending" && (
                    <div className="mt-6 flex gap-4">
                      <Button onClick={() => {
                        acceptRequest(req.id);
                        toast.success("Đã chấp nhận hợp đồng!");
                      }} className="bg-green-600">
                        <CheckCircle className="mr-2" />
                        Chấp nhận
                      </Button>
                      <Button variant="destructive" onClick={() => {
                        rejectRequest(req.id);
                        toast.info("Đã từ chối hợp đồng");
                      }}>
                        <XCircle className="mr-2" />
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