// src/services/api.ts
import { ApiResponse, Room, Contract, Notification } from "@/types";

// Giả lập delay để giống gọi API thật (có loading đẹp)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ====================== MOCK DATA ======================

// Mock data phòng nổi bật
const mockRooms: Room[] = [
  {
    id: "1",
    title: "Phòng trọ cao cấp đầy đủ tiện nghi Quận 7",
    description: "Phòng mới xây, nội thất cao cấp, gần ĐH Tôn Đức Thắng và RMIT. An ninh 24/7, giờ giấc tự do.",
    price: 6500000,
    deposit: 13000000,
    area: 30,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "conditioner", "tv", "kitchen", "bathroom"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Quận 7",
      ward: "Phường Tân Phú",
      address: "456 Đường Huỳnh Tấn Phát",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Nguyễn Văn Hùng", phone: "0909 888 999" },
  },
  {
    id: "2",
    title: "Phòng giá rẻ gần trung tâm Bình Thạnh",
    description: "Phòng sạch sẽ, thoáng mát, gần chợ, siêu thị. Phù hợp sinh viên, nhân viên văn phòng.",
    price: 3500000,
    deposit: 7000000,
    area: 20,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    ],
    amenities: ["wifi", "parking", "bathroom"],
    location: {
      province: "TP. Hồ Chí Minh",
      district: "Bình Thạnh",
      ward: "Phường 25",
      address: "789 Đường Điện Biên Phủ",
    },
    ownerId: "1",
    isActive: true,
    createdAt: new Date().toISOString(),
    owner: { name: "Nguyễn Văn Hùng", phone: "0909 888 999" },
  },
];

// Mock data hợp đồng
const mockContracts: Contract[] = [
  {
    id: "HD001",
    roomTitle: "Phòng trọ cao cấp đầy đủ tiện nghi Quận 7",
    renterName: "Trần Thị Vân Anh",
    renterPhone: "0987 654 321",
    startDate: "2025-06-01",
    endDate: "2026-06-01",
    monthlyRent: 6500000,
    deposit: 13000000,
    status: "active",
    nextPaymentDue: "2025-12-25",
    nextPaymentAmount: 6500000,
    paidThisMonth: true,
  },
  {
    id: "HD002",
    roomTitle: "Phòng giá rẻ gần trung tâm Bình Thạnh",
    renterName: "Lê Văn Cường",
    renterPhone: "0912 345 678",
    startDate: "2025-09-01",
    endDate: "2026-09-01",
    monthlyRent: 3500000,
    deposit: 7000000,
    status: "active",
    nextPaymentDue: "2025-12-01",
    nextPaymentAmount: 3500000,
    paidThisMonth: false,
  },
];

// Mock data thông báo
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Có người liên hệ",
    message: "Người thuê Hoàng Lê Kim Long gửi yêu cầu thuê về phòng 'Phòng trọ cao cấp Quận 7'",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    title: "Thanh toán tháng này",
    message: "Hợp đồng HD002 chưa thanh toán tháng 12. Hạn thanh toán: 25/12/2025",
    type: "warning",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Tin đăng được duyệt",
    message: "Phòng 'Phòng giá rẻ gần trung tâm Bình Thạnh' đã được duyệt và hiển thị",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "4",
    title: "Có người liên hệ",
    message: "Người thuê Lê Văn Cường đã gọi điện hỏi về phòng 'Phòng trọ cao cấp Quận 7'",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

// ====================== ROOM API ======================
export const roomApi = {
  search: async () => {
    await delay(800);
    return { data: { data: mockRooms, success: true } } as ApiResponse<Room[]>;
  },

  getById: async (id: string) => {
    await delay(600);
    const room = mockRooms.find(r => r.id === id) || mockRooms[0];
    return { data: { data: room, success: true } } as ApiResponse<Room>;
  },

  myRooms: async () => {
    await delay(600);
    return { data: { data: mockRooms, success: true } } as ApiResponse<Room[]>;
  },
};

// ====================== CONTRACT API ======================
export const contractApi = {
  myContracts: async () => {
    await delay(800);
    return { data: { data: mockContracts, success: true } } as ApiResponse<Contract[]>;
  },

  getById: async (id: string) => {
    await delay(600);
    const contract = mockContracts.find(c => c.id === id) || mockContracts[0];
    return { data: { data: contract, success: true } } as ApiResponse<Contract>;
  },
};

// ====================== PAYMENT API ======================
export const paymentApi = {
  createVNPay: async ({ contractId, amount }: { contractId: string; amount: number }) => {
    await delay(1000);
    return {
      data: {
        data: {
          paymentUrl: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${amount * 100}&vnp_Command=pay&vnp_OrderInfo=Thanh+toan+hop+dong+${contractId}&vnp_Version=2.1.0`,
        },
        success: true,
      },
    } as ApiResponse<{ paymentUrl: string }>;
  },
};

// ====================== NOTIFICATION API ======================
export const notificationApi = {
  getAll: async () => {
    await delay(600);
    return { data: { data: mockNotifications, success: true } } as ApiResponse<Notification[]>;
  },

  getById: async (id: string) => {
    await delay(400);
    const notification = mockNotifications.find(n => n.id === id);
    if (!notification) {
      throw new Error("Thông báo không tồn tại");
    }
    return { data: { data: notification, success: true } } as ApiResponse<Notification>;
  },

  markAsRead: async (id: string) => {
    await delay(300);
    return { data: { success: true, message: "Đánh dấu đã đọc thành công" } };
  },
};