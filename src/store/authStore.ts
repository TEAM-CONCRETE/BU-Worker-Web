import { create } from "zustand";
import type { LoginResponseData } from "@/types/auth";

interface AuthState {
  user: LoginResponseData | null;
  isAuthenticated: boolean;
  setUser: (user: LoginResponseData | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
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
}));
