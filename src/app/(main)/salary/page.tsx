"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSalaryList } from "@/hooks/useSalaryList";
import { Header } from "@/components/common";

function formatDate(dateString: string): string {
  return dateString.replace(/-/g, ".");
}

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}₩`;
}

function formatCurrencyWithSign(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  const absAmount = Math.abs(amount);
  return `${sign}${absAmount.toLocaleString("ko-KR")}₩`;
}

export default function SalaryPage() {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useSalaryList();

  const [isPulling, setIsPulling] = React.useState(false);
  const [pullDistance, setPullDistance] = React.useState(0);
  const touchStartY = React.useRef<number | null>(null);
  const pageRef = React.useRef<HTMLDivElement>(null);
  const PULL_THRESHOLD = 80;

  const handleTouchStart = React.useCallback((e: TouchEvent) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    if (touchStartY.current === null) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 0) {
      touchStartY.current = null;
      setPullDistance(0);
      setIsPulling(false);
      return;
    }

    const currentY = e.touches[0].clientY;
    const distance = currentY - touchStartY.current;

    if (distance > 0) {
      const pullAmount = Math.min(distance * 0.5, PULL_THRESHOLD * 1.5);
      setPullDistance(pullAmount);
      setIsPulling(pullAmount >= PULL_THRESHOLD);
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
  }, []);

  const handleTouchEnd = React.useCallback(() => {
    if (touchStartY.current === null) return;

    if (isPulling && pullDistance >= PULL_THRESHOLD) {
      refetch();
    }

    touchStartY.current = null;
    setIsPulling(false);
    setPullDistance(0);
  }, [isPulling, pullDistance, refetch]);

  // 터치 이벤트 리스너 등록
  React.useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    page.addEventListener("touchstart", handleTouchStart, { passive: true });
    page.addEventListener("touchmove", handleTouchMove, { passive: true });
    page.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      page.removeEventListener("touchstart", handleTouchStart);
      page.removeEventListener("touchmove", handleTouchMove);
      page.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // 무한스크롤을 위한 Intersection Observer
  const observerTarget = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지의 데이터를 평탄화
  const salaryList = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.content) ?? [];
  }, [data]);

  // 최신 급여 정보 (latestPayroll)
  const latestSalary = React.useMemo(() => {
    return data?.pages[0]?.latestPayroll ?? null;
  }, [data]);

  // 현장명 가져오기
  const siteName = React.useMemo(() => {
    if (latestSalary?.siteName) {
      return latestSalary.siteName;
    }
    if (salaryList.length > 0 && salaryList[0]?.siteName) {
      return salaryList[0].siteName;
    }
    return null;
  }, [latestSalary, salaryList]);

  const handleBackClick = () => {
    router.back();
  };

  const handleViewPayslip = (payrollId: number) => {
    router.push(`/salary/${payrollId}`);
  };

  return (
    <div
      ref={pageRef}
      className="flex min-h-screen flex-col bg-[#f9fafb] pb-24 relative"
    >
      <Header title="급여 내역" showBackButton onBackClick={handleBackClick} />

      {(pullDistance > 0 || isRefetching) && (
        <div
          className="absolute top-[56px] left-0 right-0 flex items-center justify-center w-full bg-[#f9fafb] z-10"
          style={{
            height: isRefetching
              ? `${PULL_THRESHOLD}px`
              : `${Math.min(pullDistance, PULL_THRESHOLD * 1.5)}px`,
            transform: `translateY(${pullDistance > 0 || isRefetching ? 0 : -60}px)`,
            transition:
              pullDistance === 0 && !isRefetching
                ? "transform 0.3s ease-out"
                : undefined,
          }}
        >
          {isRefetching ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-worker-primary-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-worker-neutral-500">새로고침 중...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-6 h-6 border-2 border-worker-neutral-400 border-t-transparent rounded-full transition-transform"
                style={{
                  transform: `rotate(${pullDistance >= PULL_THRESHOLD ? 180 : 0}deg)`,
                }}
              />
              <p className="text-sm text-worker-neutral-500">
                {pullDistance >= PULL_THRESHOLD
                  ? "놓으면 새로고침"
                  : "당겨서 새로고침"}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex w-full max-w-[353px] mx-auto flex-col pt-[72px]">
        {siteName && (
          <section className="px-4 pt-4 pb-2">
            <p className="text-lg font-bold text-[#6b7280]">{siteName}</p>
          </section>
        )}

        {latestSalary && (
          <section className="px-4 pt-4 pb-2">
            <p className="text-base text-[#12436d] mb-4">실지급액</p>
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
              <div className="text-center">
                <p className="text-[36px] font-bold text-[#1f70b7] leading-[42.96px]">
                  {formatCurrency(latestSalary.netPay)}
                </p>
              </div>
            </div>
          </section>
        )}

        {latestSalary && (
          <section className="px-4 pt-4 pb-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-sm text-[#6b7280] text-center mb-2">
                  기본급
                </p>
                <p className="text-base text-[#12436d] text-center">
                  {formatCurrency(latestSalary.basePay)}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-sm text-[#6b7280] text-center mb-2">
                  연장수당
                </p>
                <p className="text-base text-[#12436d] text-center">
                  {formatCurrency(latestSalary.overtimePay)}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-sm text-[#6b7280] text-center mb-2">
                  야간수당
                </p>
                <p className="text-base text-[#12436d] text-center">
                  {formatCurrency(latestSalary.nightPay)}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-sm text-[#6b7280] text-center mb-2">
                  소득세
                </p>
                <p className="text-base text-[#12436d] text-center">
                  {formatCurrencyWithSign(-latestSalary.incomeTax)}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-sm text-[#6b7280] text-center mb-2">
                  주민세
                </p>
                <p className="text-base text-[#12436d] text-center">
                  {formatCurrencyWithSign(-latestSalary.residentTax)}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-sm text-[#6b7280] text-center mb-2">
                  4대보험료
                </p>
                <p className="text-base text-[#12436d] text-center">
                  {formatCurrencyWithSign(-latestSalary.insuranceTotal)}
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="px-4 pt-4">
          <div className="flex items-center gap-2 mb-4">
            <svg
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M2 0C0.896875 0 0 0.896875 0 2V14C0 15.1031 0.896875 16 2 16H10C11.1031 16 12 15.1031 12 14V5H8C7.44688 5 7 4.55312 7 4V0H2ZM8 0V4H12L8 0ZM3.5 8H8.5C8.775 8 9 8.225 9 8.5C9 8.775 8.775 9 8.5 9H3.5C3.225 9 3 8.775 3 8.5C3 8.225 3.225 8 3.5 8ZM3.5 10H8.5C8.775 10 9 10.225 9 10.5C9 10.775 8.775 11 8.5 11H3.5C3.225 11 3 10.775 3 10.5C3 10.225 3.225 10 3.5 10ZM3.5 12H8.5C8.775 12 9 12.225 9 12.5C9 12.775 8.775 13 8.5 13H3.5C3.225 13 3 12.775 3 12.5C3 12.225 3.225 12 3.5 12Z"
                fill="#12436D"
              />
            </svg>
            <p className="text-base text-[#12436d]">
              지급 내역 및 급여명세서 조회
            </p>
          </div>

          <div className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
            <div className="bg-[#f9fafb] border-b border-[#e5e7eb] px-4 h-[65px] flex items-center">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
                <div className="text-xs sm:text-sm font-normal text-[#6b7280] text-center">
                  날짜
                </div>
                <div className="text-xs sm:text-sm font-normal text-[#6b7280] text-center">
                  실지급액
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-normal text-[#6b7280] text-center whitespace-nowrap">
                  급여명세서 조회
                </div>
              </div>
            </div>

            <div className="divide-y divide-[#f3f4f6]">
              {isLoading && salaryList.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-worker-neutral-500">로딩 중...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-worker-danger">
                    {error instanceof Error
                      ? error.message
                      : "급여 내역을 불러오는데 실패했습니다."}
                  </p>
                </div>
              ) : salaryList.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-worker-neutral-500">
                    급여 내역이 없습니다.
                  </p>
                </div>
              ) : (
                salaryList.map((item) => (
                  <div
                    key={item.payrollId}
                    className="px-4 h-[77px] flex items-center"
                  >
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full items-center">
                      <div className="text-xs sm:text-sm font-normal text-[#111827] text-left">
                        {formatDate(item.payDate)}
                      </div>
                      <div className="text-xs sm:text-sm font-normal text-[#12436d] text-center">
                        {formatCurrency(item.netPay)}
                      </div>
                      <div className="text-center">
                        {item.hasPdf ? (
                          <button
                            onClick={() => handleViewPayslip(item.payrollId)}
                            className="px-2 sm:px-3 py-1.5 sm:py-2 border border-[#1f70b7] rounded-lg text-[10px] sm:text-xs md:text-sm text-[#1f70b7] hover:bg-[#1f70b7] hover:text-white transition-colors whitespace-nowrap"
                          >
                            조회
                          </button>
                        ) : (
                          <span className="text-xs sm:text-sm text-worker-neutral-400">
                            -
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {hasNextPage && <div ref={observerTarget} className="h-4" />}

          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-4">
              <p className="text-sm text-worker-neutral-500">
                더 불러오는 중...
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
