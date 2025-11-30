import { create } from "zustand";
import type { RegisterResponseData } from "@/types/auth";

interface RegisterState {
  profileToken: string | null;
  profileTokenExpiresAt: string | null;
  registerData: RegisterResponseData | null;
  setRegisterData: (data: RegisterResponseData) => void;
  clearRegisterData: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  profileToken: null,
  profileTokenExpiresAt: null,
  registerData: null,
  setRegisterData: (data) =>
    set({
      profileToken: data.profileToken,
      profileTokenExpiresAt: data.profileTokenExpiresAt,
      registerData: data,
    }),
  clearRegisterData: () =>
    set({
      profileToken: null,
      profileTokenExpiresAt: null,
      registerData: null,
    }),
}));
