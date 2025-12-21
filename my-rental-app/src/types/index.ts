// src/types/index.ts
export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: "owner" | "renter";
  isActive: boolean;
  createdAt: string;
};

export type Room = {
  id: string;
  title: string;
  description: string;
  price: number;
  deposit: number;
  area: number;
  images: string[];
  amenities: string[];
  location: {
    province: string;
    district: string;
    ward?: string;
    address: string;
  };
  ownerId: string;
  isActive: boolean;
  createdAt: string;
  owner?: {
    name: string;
    phone?: string;
  };
};

export type Contract = {
  id: string;
  roomTitle: string;
  renterName: string;
  renterPhone: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: "active" | "expired" | "cancelled";
  nextPaymentDue: string;
  nextPaymentAmount: number;
  paidThisMonth: boolean;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  message?: string;
};