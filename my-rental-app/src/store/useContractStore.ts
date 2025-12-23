// src/store/useContractStore.ts
import { create } from 'zustand';

export interface ContractRequest {
  id: string;
  roomId: string;
  roomTitle: string;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface RenterNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface Store {
  requests: ContractRequest[];
  renterNotifications: RenterNotification[];
  addRequest: (request: Omit<ContractRequest, 'status'>) => void;
  acceptRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
}

export const useContractStore = create<Store>((set, get) => ({
  requests: [],
  renterNotifications: [],

  addRequest: (request) =>
    set({
      requests: [{ ...request, status: 'pending' }, ...get().requests],
    }),

  acceptRequest: (id) => {
    set({
      requests: get().requests.map((r) =>
        r.id === id ? { ...r, status: 'accepted' } : r
      ),
    });

    const req = get().requests.find((r) => r.id === id);
    if (req) {
      set({
        renterNotifications: [
          {
            id: `noti-${id}`,
            title: "Yêu cầu thuê phòng đã được chấp nhận",
            message: `Chủ trọ đã chấp nhận yêu cầu thuê phòng "${req.roomTitle}" của bạn. Vui lòng liên hệ để ký hợp đồng.`,
            createdAt: new Date().toISOString(),
            read: false,
          },
          ...get().renterNotifications,
        ],
      });
    }
  },

  rejectRequest: (id) => {
    set({
      requests: get().requests.map((r) =>
        r.id === id ? { ...r, status: 'rejected' } : r
      ),
    });

    const req = get().requests.find((r) => r.id === id);
    if (req) {
      set({
        renterNotifications: [
          {
            id: `noti-${id}`,
            title: "Yêu cầu thuê phòng bị từ chối",
            message: `Chủ trọ đã từ chối yêu cầu thuê phòng "${req.roomTitle}" của bạn.`,
            createdAt: new Date().toISOString(),
            read: false,
          },
          ...get().renterNotifications,
        ],
      });
    }
  },
}));