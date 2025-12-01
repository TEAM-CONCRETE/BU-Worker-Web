"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useHomeData } from "@/hooks/useHomeData";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownToast = React.useRef(false);
  const user = useAuthStore((state) => state.user);
  const { data: homeData, isLoading, error } = useHomeData();

  React.useEffect(() => {
    const registered = searchParams.get("registered");

    if (registered === "true" && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("얼굴 등록이 완료되었습니다!");

      router.replace("/home");
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col bg-worker-neutral-50 pb-24">
      <div className="flex w-full max-w-[353px] mx-auto flex-col px-4 pt-4">
        <section className="mb-6">
          <h1 className="text-xl font-semibold text-[#12436d] mb-2">
            {user?.userName || "사용자"}님, 환영합니다 👋
          </h1>
          <p className="text-sm text-worker-neutral-500">
            오늘도 안전한 하루 되세요.
          </p>
        </section>

        {homeData && homeData.pendingContracts.count > 0 && (
          <section className="mb-6">
            <div className="bg-white rounded-2xl border border-worker-neutral-200 p-6">
              <h2 className="text-base font-semibold text-worker-primary-600 mb-4">
                미결 전자계약: {homeData.pendingContracts.count}건
              </h2>
              <div className="space-y-3">
                {homeData.pendingContracts.items.map((item, index) => {
                  if (item.type === "CONTRACT" && item.contractId) {
                    return (
                      <button
                        key={`contract-${item.contractId}-${index}`}
                        type="button"
                        onClick={() =>
                          router.push(
                            `/contract/sign/${item.contractId}?siteId=${item.siteId}`
                          )
                        }
                        className="w-full bg-[#eaf3fc] rounded-xl border border-worker-neutral-200 px-5 py-4 flex items-center justify-between hover:bg-[#d4e7f9] transition-colors"
                      >
                        <span className="text-base font-semibold text-[#12436d]">
                          근로계약서 서명하러 가기
                        </span>
                        <svg
                          className="w-2 h-3 text-[#12436d]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    );
                  } else if (
                    item.type === "SAFETY_LOG" ||
                    item.type === "SAFETY_EDUCATION"
                  ) {
                    // safetyLogId가 없어도 타입이 SAFETY_LOG 또는 SAFETY_EDUCATION이면 표시
                    const logId = item.safetyLogId;
                    if (!logId) {
                      return null;
                    }
                    return (
                      <button
                        key={`safety-${logId}-${index}`}
                        type="button"
                        onClick={() =>
                          router.push(
                            `/safety-log/sign/${logId}?siteId=${item.siteId}`
                          )
                        }
                        className="w-full bg-[#eaf3fc] rounded-xl border border-worker-neutral-200 px-5 py-4 flex items-center justify-between hover:bg-[#d4e7f9] transition-colors"
                      >
                        <span className="text-base font-semibold text-[#12436d]">
                          안전교육일지 서명하러 가기
                        </span>
                        <svg
                          className="w-2 h-3 text-[#12436d]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </section>
        )}

        {homeData && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-[#12436d] mb-4">
              💰 최근 급여 내역
            </h2>
            {homeData.recentSalary ? (
              <div className="bg-white rounded-2xl border border-worker-neutral-200 p-6">
                <h3 className="text-base font-bold text-worker-neutral-900 text-center mb-2">
                  {homeData.recentSalary.siteName}
                </h3>
                <p className="text-sm text-worker-neutral-500 text-center mb-4">
                  {new Date(homeData.recentSalary.payDate).toLocaleDateString(
                    "ko-KR",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </p>
                <div className="mb-6">
                  <p className="text-[36px] font-extrabold text-worker-primary-600 text-center">
                    {homeData.recentSalary.netPay.toLocaleString()}₩
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full bg-worker-neutral-50 rounded-lg border border-worker-neutral-200 py-3 text-sm font-medium text-worker-neutral-700 hover:bg-worker-neutral-100 transition-colors"
                >
                  상세보기
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-worker-neutral-200 p-6">
                <p className="text-sm text-worker-neutral-500 text-center py-8">
                  최근 급여 내역이 없습니다.
                </p>
              </div>
            )}
          </section>
        )}

        {homeData && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-[#12436d] mb-4">
              🕒 금일 근태 내역
            </h2>
            {homeData.todayAttendance ? (
              <div className="bg-worker-neutral-100 rounded-xl border border-worker-neutral-200 p-6">
                <div className="text-center">
                  <p className="text-[30px] font-bold text-worker-primary-600 mb-2">
                    {homeData.todayAttendance.status === "WORKING"
                      ? "출근"
                      : homeData.todayAttendance.status === "COMPLETED"
                        ? "퇴근"
                        : "결근"}
                  </p>
                  <p className="text-base text-worker-neutral-700">
                    {homeData.todayAttendance.checkInTime}
                    {homeData.todayAttendance.checkOutTime &&
                      ` - ${homeData.todayAttendance.checkOutTime}`}
                  </p>
                  {homeData.todayAttendance.isLate && (
                    <p className="text-sm text-worker-danger mt-1">지각</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-worker-neutral-100 rounded-xl border border-worker-neutral-200 p-6">
                <p className="text-sm text-worker-neutral-500 text-center py-4">
                  금일 근태 내역이 없습니다.
                </p>
              </div>
            )}
          </section>
        )}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-worker-neutral-500">로딩 중...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-worker-danger">
              {error instanceof Error
                ? error.message
                : "홈 화면 정보를 불러오는데 실패했습니다."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
