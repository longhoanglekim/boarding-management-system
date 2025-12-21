// src/app/contracts/[id]/page.tsx

import { notFound } from "next/navigation";
import { contractApi } from "@/services/api";
import { Contract } from "@/types";
import { formatVND } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VNPayButton } from "@/components/contract/VNPayButton";
import {
  Calendar,
  DollarSign,
  Home,
  User,
  Phone,
} from "lucide-react";

interface Props {
  params: { id: string };
}

export default async function ContractDetailPage({ params }: Props) {
  const { id } = params;

  let contract: Contract | null = null;

  try {
    const res = await contractApi.getById(id);
    contract = res.data?.data ?? null;
  } catch (err) {
    console.error("Error fetching contract:", err);
  }

  if (!contract) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">
        Chi tiết hợp đồng {contract.id}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-6 h-6" />
                Thông tin phòng trọ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">
                {contract.roomTitle}
              </h3>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatVND(contract.monthlyRent)}
                  </p>
                  <p className="text-sm text-gray-600">Thuê/tháng</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    {formatVND(contract.deposit)}
                  </p>
                  <p className="text-sm text-gray-600">Tiền cọc</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">12 tháng</p>
                  <p className="text-sm text-gray-600">Thời hạn</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Thời hạn hợp đồng
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Bắt đầu</p>
                <p className="font-semibold">
                  {new Date(contract.startDate).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <Badge className="px-4 py-2">Đang hiệu lực</Badge>

              <div className="text-right">
                <p className="text-sm text-gray-600">Kết thúc</p>
                <p className="font-semibold">
                  {new Date(contract.endDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </CardContent>
          </Card>

          {!contract.paidThisMonth && (
            <Card className="border-orange-300 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <DollarSign className="w-6 h-6" />
                  Thanh toán tháng này
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-orange-900">
                    {formatVND(contract.nextPaymentAmount)}
                  </p>
                  <p className="text-sm text-orange-700">
                    Hạn:{" "}
                    {new Date(contract.nextPaymentDue).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>

                {/* Client Component – OK */}
                <VNPayButton
                  contractId={contract.id}
                  amount={contract.nextPaymentAmount}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-6 h-6" />
                Người thuê
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{contract.renterName}</p>
              <p className="text-sm text-gray-600 flex gap-2 mt-2">
                <Phone className="w-4 h-4" />
                {contract.renterPhone}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
