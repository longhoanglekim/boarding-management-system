// src/app/contracts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { contractApi } from "@/services/api";
import { Contract } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { VNPayButton } from "@/components/contract/VNPayButton";
import { useAuth } from "@/hooks/useAuth";

export default function ContractsPage() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await contractApi.myContracts();
        if (res.data?.data) {
          setContracts(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching contracts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Đang tải hợp đồng...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {user?.role === "owner" ? "Quản lý hợp đồng thuê" : "Hợp đồng của tôi"}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách hợp đồng ({contracts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {contracts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                {user?.role === "owner" ? "Chưa có hợp đồng nào" : "Bạn chưa có hợp đồng thuê phòng nào"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hợp đồng</TableHead>
                  <TableHead>{user?.role === "owner" ? "Người thuê" : "Phòng trọ"}</TableHead>
                  <TableHead>Thời hạn</TableHead>
                  <TableHead className="text-right">Tiền thuê/tháng</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-center">Thanh toán tháng này</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                      <Link href={`/contracts/${contract.id}`} className="text-blue-600 hover:underline">
                        {contract.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {user?.role === "owner" ? contract.renterName : contract.roomTitle}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {new Date(contract.startDate).toLocaleDateString('vi-VN')} → {new Date(contract.endDate).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatVND(contract.monthlyRent)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={contract.status === "active" ? "default" : "secondary"}>
                        {contract.status === "active" ? "Đang hiệu lực" : "Hết hạn"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={contract.paidThisMonth ? "default" : "destructive"} className={contract.paidThisMonth ? "bg-green-600" : ""}>
                        {contract.paidThisMonth ? "Đã thanh toán" : "Chưa thanh toán"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {!contract.paidThisMonth && user?.role === "renter" && (
                        <VNPayButton contractId={contract.id} amount={contract.nextPaymentAmount} />
                      )}
                      {contract.paidThisMonth && user?.role === "owner" && (
                        <Badge variant="outline">Đã nhận tiền</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}