import type { ApiResponse } from "./api";

// 미결 전자계약 항목
export interface PendingContractItem {
  type: "CONTRACT" | "SAFETY_LOG";
  contractId?: number;
  safetyLogId?: number;
  siteId: number;
  siteName: string;
}

// 미결 전자계약
export interface PendingContracts {
  count: number;
  items: PendingContractItem[];
}

// 최근 급여 내역
export interface RecentSalary {
  payrollId: number;
  siteId: number;
  siteName: string;
  payDate: string;
  netPay: number;
}

// 금일 근태
export interface TodayAttendance {
  siteId: number;
  siteName: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: "WORKING" | "COMPLETED" | "ABSENT";
  isLate: boolean;
}

// 홈 화면 응답 데이터
export interface HomeResponseData {
  pendingContracts: PendingContracts;
  recentSalary: RecentSalary | null;
  todayAttendance: TodayAttendance | null;
}

// 홈 화면 응답
export type HomeResponse = ApiResponse<HomeResponseData>;
