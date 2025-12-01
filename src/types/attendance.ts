import type { ApiResponse } from "./api";

// 출퇴근 내역 항목
export interface AttendanceItem {
  attendanceId: number;
  date: string; // "2025-11-24"
  siteId: number;
  siteName: string;
  checkInTime: string; // "08:55"
  checkOutTime: string | null; // "18:10" or null
  status: "WORKING" | "COMPLETED" | "INCOMPLETE";
  isLate: boolean;
}

// 페이지네이션 응답
export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// 출퇴근 내역 조회 응답
export type AttendanceListResponse = ApiResponse<PageResponse<AttendanceItem>>;
