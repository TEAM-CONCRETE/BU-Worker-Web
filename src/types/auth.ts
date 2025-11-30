import type { ApiResponse } from "./api";

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponseData {
  userId: string;
  userName: string;
  role: "ROLE_EMPLOYEE" | "ROLE_MANAGER" | "ROLE_COMPANY";
  profileCompleted: boolean;
  expiresIn: number;
  employeeId?: number;
  managerId?: number;
  siteId?: number;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface RegisterRequest {
  empName: string;
  userId: string;
  password: string;
  confirmPassword: string;
  secretKey: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  passwordMatching: boolean;
}

export interface RegisterUserData {
  id: number;
  userId: string;
  role: string;
  phone: string;
  email: string;
}

export interface RegisterProfileData {
  employeeId: number;
  empName: string;
  empAddress: string;
  emergencyPhone: string;
  managerId: number;
  managerName: string;
}

export interface RegisterLinkingData {
  secretKeyUsed: boolean;
  siteLinked?: {
    siteId: number;
    siteName: string;
  };
}

export interface RegisterResponseData {
  user: RegisterUserData;
  profile: RegisterProfileData;
  profileToken: string;
  profileTokenExpiresAt: string;
  nextStepMessage: string;
  linking: RegisterLinkingData;
}

export type RegisterResponse = ApiResponse<RegisterResponseData>;

export interface UserIdExistsResponseData {
  exists: boolean;
}

export type UserIdExistsResponse = ApiResponse<UserIdExistsResponseData>;
