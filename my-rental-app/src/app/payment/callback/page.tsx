// src/app/payment/callback/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const responseCode = searchParams.get("vnp_ResponseCode");
    const transactionStatus = searchParams.get("vnp_TransactionStatus");
    const txnRef = searchParams.get("vnp_TxnRef");
    const amount = searchParams.get("vnp_Amount");
    const bankCode = searchParams.get("vnp_BankCode");
    const bankTranNo = searchParams.get("vnp_BankTranNo");
    const payDate = searchParams.get("vnp_PayDate");
    const orderInfo = decodeURIComponent(searchParams.get("vnp_OrderInfo") || "");

    const isSuccess = responseCode === "00" && transactionStatus === "00";

    if (isSuccess) {
      toast.success(
        <div className="flex items-center gap-4">
          <CheckCircle className="h-12 w-12 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-xl font-bold">Thanh toán thành công!</p>
            <p className="text-sm mt-1">Mã giao dịch VNPay: <strong>{txnRef}</strong></p>
            <p className="text-sm">Số tiền: <strong>{new Intl.NumberFormat("vi-VN").format(Number(amount) / 100)} ₫</strong></p>
            <p className="text-sm">Ngân hàng: <strong>{bankCode}</strong></p>
          </div>
        </div>,
        { duration: 15000 }
      );
    } else {
      toast.error(
        <div className="flex items-center gap-4">
          <XCircle className="h-12 w-12 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-xl font-bold">Thanh toán thất bại!</p>
            <p className="text-sm mt-1">Mã lỗi: {responseCode || "Không xác định"}</p>
            <p className="text-sm">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
          </div>
        </div>,
        { duration: 15000 }
      );
    }

    // Tự động về trang chủ sau 8 giây
    const timer = setTimeout(() => {
      router.push("/");
    }, 8000);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  const responseCode = searchParams.get("vnp_ResponseCode");
  const isSuccess = responseCode === "00";

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <CreditCard className="w-20 h-20 mx-auto text-blue-600 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Kết quả thanh toán VNPay
        </h1>
        <p className="text-xl text-gray-600">
          Hệ thống đang xác nhận kết quả từ VNPay...
        </p>
      </div>

      <Card className="shadow-2xl">
        <CardHeader className={`text-center py-10 ${isSuccess ? "bg-green-50" : "bg-red-50"}`}>
          <div className="flex justify-center mb-4">
            {isSuccess ? (
              <CheckCircle className="w-24 h-24 text-green-600" />
            ) : (
              <XCircle className="w-24 h-24 text-red-600" />
            )}
          </div>
          <CardTitle className={`text-3xl font-bold ${isSuccess ? "text-green-700" : "text-red-700"}`}>
            {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div>
              <p className="text-gray-600">Mã giao dịch VNPay:</p>
              <p className="font-semibold">{searchParams.get("vnp_TxnRef") || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600">Số tiền thanh toán:</p>
              <p className="font-semibold text-blue-600">
                {searchParams.get("vnp_Amount") ? new Intl.NumberFormat("vi-VN").format(Number(searchParams.get("vnp_Amount")) / 100) + " ₫" : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Ngân hàng:</p>
              <p className="font-semibold">{searchParams.get("vnp_BankCode") || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600">Thời gian thanh toán:</p>
              <p className="font-semibold">
                {searchParams.get("vnp_PayDate") 
                  ? new Date(
                      searchParams.get("vnp_PayDate")!.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6")
                    ).toLocaleString("vi-VN")
                  : "N/A"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">Nội dung thanh toán:</p>
              <p className="font-semibold">{decodeURIComponent(searchParams.get("vnp_OrderInfo") || "")}</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Về trang chủ
              </Button>
            </Link>
            <Link href="/contracts">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Xem hợp đồng của tôi
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Bạn sẽ được chuyển về trang chủ trong vài giây...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}