import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decodeToken } from "../utils/auth";

interface AdminStore {
  accessToken: { value: string | null; expiresAt: number } | null;
  setAccessToken: (token: string | null, ttl?: number) => void;
  isAdmin: () => boolean;
  userId: () => string | null;
  // setAdmin: (state: boolean) => void;
}

const adminId = import.meta.env.VITE_ADMIN_ID;

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (token, ttl = 1 * 60 * 1000) => {
        const expiresAt = Date.now() + ttl;
        return set({ accessToken: { value: token, expiresAt } });
      },
      isAdmin: () =>
        decodeToken(get().accessToken?.value ?? null)?.username === adminId,
      userId: () => {
        const tokenData = get().accessToken;
        if (!tokenData) return null;
        if (Date.now() > tokenData.expiresAt) {
          set({ accessToken: null });
          return null;
        }

        return decodeToken(tokenData?.value ?? null)?.id || null;
      },
    }),
    {
      name: "ably-token",
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);
