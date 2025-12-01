import type { ApiResponse } from "@/types/api";

// 급여 상세 정보 (latestPayroll)
export interface SalaryDetail {
  payrollId: number;
  siteName: string;
  salaryYear: number;
  salaryMonth: number;
  payDate: string; // "2025-01-25"
  payStatus: "PENDING" | "PAID" | "CANCELLED";
  netPay: number; // 실지급액
  basePay: number; // 기본급
  overtimePay: number; // 연장수당
  nightPay: number; // 야간수당
  incomeTax: number; // 소득세
  residentTax: number; // 주민세
  insuranceTotal: number; // 4대보험료
  hasPdf: boolean; // 급여명세서 PDF 존재 여부
}

// 급여 내역 항목 (목록용)
export interface SalaryItem {
  payrollId: number;
  siteName: string;
  salaryYear: number;
  salaryMonth: number;
  payDate: string; // "2025-01-25"
  netPay: number; // 실지급액
  payStatus: "PENDING" | "PAID" | "CANCELLED";
  hasPdf: boolean; // 급여명세서 PDF 존재 여부
}

// 급여 내역 조회 응답 데이터
export interface SalaryListData {
  latestPayroll: SalaryDetail | null;
  content: SalaryItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// 급여 내역 조회 응답
export type SalaryListResponse = ApiResponse<SalaryListData>;
