// src/components/notification/NotificationItem.tsx
"use client";

import { Notification } from "@/types";
import { formatDate } from "@/lib/utils";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: (id: string) => void;
}

export default function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const icon = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  }[notification.type];

  return (
    <div className={`p-4 rounded-lg border ${notification.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-300"}`}>
      <div className="flex items-start gap-4">
        <div className="mt-1">{icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-2">{formatDate(notification.createdAt)}</p>
        </div>
        {!notification.read && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="text-sm text-blue-600 hover:underline"
          >
            Đánh dấu đã đọc
          </button>
        )}
      </div>
    </div>
  );
}