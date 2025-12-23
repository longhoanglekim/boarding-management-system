// src/components/contract/VNPayButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

interface VNPayButtonProps {
  contractId?: string;
  amount: number; // số tiền thanh toán (VNĐ)
  orderInfo?: string;
  size?: "sm" | "default" | "lg";
}

export function VNPayButton({
  contractId = "HD001",
  amount,
  orderInfo = "Thanh toan hop dong thue phong",
  size = "lg",
}: VNPayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (loading || amount <= 0) return;

    setLoading(true);
    toast.loading("Đang tạo link thanh toán VNPay...", { duration: Infinity });

    try {
      // GỌI GET VỚI PARAMS NHƯ POSTMAN MÀY CHỤP
      const url = new URL("http://localhost:8080/api/payment/vn-pay");
      url.searchParams.append("amount", amount.toString());
      url.searchParams.append("bankCode", "NCB"); // mặc định NCB như mày muốn

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (result.success && result.data?.paymentUrl) {
        toast.dismiss();
        toast.success("Mở trang thanh toán VNPay (NCB) thành công!");
        window.open(result.data.paymentUrl, "_blank");
      } else {
        toast.dismiss();
        toast.error(result.message || "Không thể tạo link thanh toán");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || "Lỗi kết nối backend VNPay");
      console.error("VNPay error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      size={size}
      disabled={loading}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {loading ? "Đang xử lý..." : "Thanh toán VNPay (Ngân hàng NCB)"}
    </Button>
  );
}