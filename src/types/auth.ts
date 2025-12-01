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
  hasRequiredInfo?: boolean;
  hasProfileImage?: boolean;
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

export interface RegisterStep2Request {
  registrationToken: string;
  residentNum: string;
  phone: string;
  email: string;
  empAddress: string;
  emergencyPhone: string;
}

export interface RegisterStep2VerificationRequired {
  phone: boolean;
  email: boolean;
}

export interface RegisterStep2ResponseData {
  user: RegisterUserData;
  profile: RegisterProfileData;
  verificationRequired: RegisterStep2VerificationRequired;
  linking: RegisterLinkingData;
}

export type RegisterStep2Response = ApiResponse<RegisterStep2ResponseData>;

// Presigned URL 발급 요청 타입
export interface PresignedUrlRequest {
  resourceType: string;
  fileExtension: string;
  employeeId?: number;
}

// Presigned URL 발급 응답 데이터 타입
export interface PresignedUrlResponseData {
  uploadUrl: string;
  expiresAt: string;
  s3Key: string;
  bucket: string;
}

// Presigned URL 발급 응답 타입
export type PresignedUrlResponse = ApiResponse<PresignedUrlResponseData>;

// 얼굴 등록 요청 타입
export interface RegisterFaceRequest {
  uploadId: string;
}

// 얼굴 등록 응답 타입 (data가 string)
export type RegisterFaceResponse = ApiResponse<string>;
