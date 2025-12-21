// src/app/notifications/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import Link from "next/link";
import { notificationApi } from "@/services/api";
import { Notification } from "@/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notificationApi.getAll();
        if (res.data?.data) {
          setNotifications(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="text-center py-20">
        <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
        <p className="text-xl text-gray-600">Đang tải thông báo...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bell className="w-8 h-8 text-blue-600" />
          Thông báo
        </h1>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-lg px-3 py-1">
            {unreadCount} chưa đọc
          </Badge>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-20">
            <Bell className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Chưa có thông báo nào</p>
            <p className="text-gray-500 mt-2">Các thông báo mới sẽ hiện ở đây</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Link href={`/notifications/${notification.id}`} key={notification.id}>
              <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer border ${!notification.read ? "border-l-4 border-l-blue-600 bg-blue-50" : "bg-white"}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(notification.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    {!notification.read && (
                      <Badge variant="default" className="ml-4">
                        Mới
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}