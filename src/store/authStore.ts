import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponseData } from "@/types/auth";

interface AuthState {
  user: LoginResponseData | null;
  isAuthenticated: boolean;
  setUser: (user: LoginResponseData | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
