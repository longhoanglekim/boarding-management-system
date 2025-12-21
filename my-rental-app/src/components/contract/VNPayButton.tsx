// src/components/contract/VNPayButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

interface VNPayButtonProps {
  contractId?: string;
  amount?: number;
  size?: "sm" | "default" | "lg";
}

export function VNPayButton({
  contractId = "HD001",
  amount = 5000000,
  size = "sm",
}: VNPayButtonProps) {
  const handlePayment = () => {
    toast.loading("Đang chuyển đến cổng thanh toán VNPay...", { duration: 2000 });

    setTimeout(() => {
      toast.success("Mở trang thanh toán VNPay (sandbox) thành công!");
      const vnpayUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${
        amount * 100
      }&vnp_Command=pay&vnp_OrderInfo=Thanh+toan+hop+dong+${contractId}`;
      window.open(vnpayUrl, "_blank");
    }, 1500);
  };

  return (
    <Button onClick={handlePayment} size={size}>
      <CreditCard className="mr-2 h-4 w-4" />
      Thanh toán VNPay
    </Button>
  );
}
