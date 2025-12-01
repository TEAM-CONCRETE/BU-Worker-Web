import type { ApiResponse } from "./api";

// PDF 문서 조회 응답 (Signed URL)
export interface DocumentUrlResponse {
  url: string;
  expiresAt: string;
}

// Presigned URL 발급 요청
export interface PresignedSignatureUrlRequest {
  resourceType: "CONTRACT" | "SAFETY_EDUCATION_LOG" | "SAFETY_DOC";
  resourceId: string;
  signerRole: "EMPLOYEE" | "MANAGER";
  fileExtension: "png" | "jpg" | "jpeg" | "pdf";
  employeeId?: number; // SAFETY_DOC + EMPLOYEE일 때 필수
}

// Presigned URL 발급 응답
export interface PresignedSignatureUrlResponse {
  uploadUrl: string;
  expiresAt: string;
  s3Key: string;
  bucket: string;
}

// 근로계약서 서명 제출 요청
export interface SubmitContractSignatureRequest {
  signatureS3Key: string;
  clientHash: string;
  coordinates?: SignatureCoordinates;
}

// 근로계약서 서명 제출 응답
export interface SubmitContractSignatureResponse {
  signatureS3Key: string;
  clientHash: string;
}

// 안전교육일지 서명 좌표
export interface SignatureCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
  viewWidth: number;
  viewHeight: number;
}

// 안전교육일지 서명 제출 요청
export interface SubmitSafetyLogSignatureRequest {
  signatureS3Key: string;
  clientHash: string;
  coordinates: SignatureCoordinates;
}

// 안전교육일지 서명 제출 응답
export interface SubmitSafetyLogSignatureResponse {
  safetyEducationLogId: number;
  status: string;
  pdfUrl: string;
  pdfHash: string | null;
  signedAt: string;
}

// API 응답 타입들
export type DocumentUrlApiResponse = ApiResponse<DocumentUrlResponse>;
export type PresignedSignatureUrlApiResponse =
  ApiResponse<PresignedSignatureUrlResponse>;
export type SubmitContractSignatureApiResponse =
  ApiResponse<SubmitContractSignatureResponse>;
export type SubmitSafetyLogSignatureApiResponse =
  ApiResponse<SubmitSafetyLogSignatureResponse>;
