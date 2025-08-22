import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
  isAdmin: boolean;
  setAdmin: (state: boolean) => void;
 }

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isAdmin: false,
      setAdmin: (state) => set({ isAdmin: state })
    }),
    {
      name: 'admin-storage'
    }
  )
)