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
