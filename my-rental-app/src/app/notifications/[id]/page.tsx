// src/app/notifications/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { notificationApi } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  params: Promise<{ id: string }>; // params là Promise
}

export default function NotificationDetailPage({ params }: Props) {
  const [notification, setNotification] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const resolvedParams = await params; // Await Promise
        const id = resolvedParams.id;

        const res = await notificationApi.getById(id);
        if (res.data?.data) {
          setNotification(res.data.data);
        } else {
          notFound();
        }
      } catch (err) {
        console.error("Error fetching notification:", err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [params]);

  const handleMarkRead = async () => {
    if (!notification) return;
    try {
      await notificationApi.markAsRead(notification.id);
      toast.success("Đánh dấu đã đọc thành công");
      setNotification({ ...notification, read: true });
    } catch (err) {
      toast.error("Không thể đánh dấu đã đọc");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Đang tải thông báo...</p>
      </div>
    );
  }

  if (!notification) {
    notFound();
  }

  const icon = {
    success: <CheckCircle className="w-10 h-10 text-green-600" />,
    warning: <AlertCircle className="w-10 h-10 text-yellow-600" />,
    error: <AlertCircle className="w-10 h-10 text-red-600" />,
    info: <Info className="w-10 h-10 text-blue-600" />,
  }[notification.type];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link href="/notifications">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Quay lại danh sách thông báo
        </Button>
      </Link>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-start gap-6">
            {icon}
            <div className="flex-1">
              <CardTitle className="text-3xl mb-3">{notification.title}</CardTitle>
              <div className="flex items-center gap-6">
                <p className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleString('vi-VN')}
                </p>
                {!notification.read && (
                  <Badge variant="default" className="px-3 py-1">
                    Mới
                  </Badge>
                )}
              </div>
            </div>
            {!notification.read && (
              <Button onClick={handleMarkRead} variant="outline" size="lg">
                Đánh dấu đã đọc
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {notification.message}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}