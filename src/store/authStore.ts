import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponseData } from "@/types/auth";

interface AuthState {
  user: LoginResponseData | null;
  isAuthenticated: boolean;
  siteName: string | null;
  setUser: (user: LoginResponseData | null) => void;
  setSiteName: (siteName: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      siteName: null,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      setSiteName: (siteName) =>
        set({
          siteName,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          siteName: null,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
