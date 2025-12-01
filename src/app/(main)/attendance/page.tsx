"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAttendanceList } from "@/hooks/useAttendanceList";
import { Header } from "@/components/common";

// 날짜 포맷팅: "2025-11-24" -> "2025.11.24"
function formatDate(dateString: string): string {
  return dateString.replace(/-/g, ".");
}

// 상태 텍스트 및 색상
function getStatusDisplay(
  status: string,
  isLate: boolean
): {
  text: string;
  color: string;
} {
  if (isLate) {
    return { text: "지각", color: "text-[#ff8400]" };
  }
  if (status === "COMPLETED") {
    return { text: "정상", color: "text-[#10b981]" };
  }
  if (status === "WORKING") {
    return { text: "근무중", color: "text-[#10b981]" };
  }
  return { text: "미퇴근", color: "text-worker-neutral-500" };
}

export default function AttendancePage() {
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
  } = useAttendanceList();

  // Pull-to-refresh 상태
  const [isPulling, setIsPulling] = React.useState(false);
  const [pullDistance, setPullDistance] = React.useState(0);
  const touchStartY = React.useRef<number | null>(null);
  const pageRef = React.useRef<HTMLDivElement>(null);
  const PULL_THRESHOLD = 80; // 새로고침을 트리거할 최소 거리

  // Pull-to-refresh 핸들러
  const handleTouchStart = React.useCallback((e: TouchEvent) => {
    // 스크롤이 맨 위에 있을 때만 pull-to-refresh 활성화
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    if (touchStartY.current === null) return;

    // 스크롤이 맨 위에 있지 않으면 취소
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
      // 아래로 당기는 경우
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
      // 새로고침 실행
      refetch();
    }

    // 상태 초기화
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
  const attendanceList = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.content) ?? [];
  }, [data]);

  // 현장명 가져오기: 출퇴근 내역에서만 가져오기
  const siteName = React.useMemo(() => {
    if (attendanceList.length > 0 && attendanceList[0]?.siteName) {
      return attendanceList[0].siteName;
    }
    return null;
  }, [attendanceList]);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div
      ref={pageRef}
      className="flex min-h-screen flex-col bg-[#f9fafb] pb-24 relative"
    >
      <Header title="근태 내역" showBackButton onBackClick={handleBackClick} />

      {/* Pull-to-refresh 인디케이터 */}
      {(pullDistance > 0 || isRefetching) && (
        <div
          className="absolute top-[56px] left-0 right-0 flex items-center justify-center w-full bg-[#f9fafb] z-10"
          style={{
            height: `${Math.min(pullDistance, PULL_THRESHOLD * 1.5)}px`,
            transform: `translateY(${pullDistance > 0 ? 0 : -60}px)`,
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

      <div className="flex w-full max-w-[353px] mx-auto flex-col pt-[56px]">
        {siteName && (
          <section className="px-4 pt-4 pb-2">
            <p className="text-lg font-bold text-[#6b7280]">{siteName}</p>
          </section>
        )}

        {/* 근태 내역 테이블 */}
        <section className="px-4 pt-4">
          <div className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
            {/* 테이블 헤더 */}
            <div className="bg-[#f9fafb] border-b border-[#e5e7eb] px-4 h-[53px] flex items-center">
              <div className="grid grid-cols-4 gap-4 w-full">
                <div className="text-sm font-normal text-black text-left leading-[16.71px]">
                  날짜
                </div>
                <div className="text-sm font-normal text-black text-center leading-[16.71px]">
                  출근 시간
                </div>
                <div className="text-sm font-normal text-black text-center leading-[16.71px]">
                  퇴근 시간
                </div>
                <div className="text-sm font-normal text-black text-center leading-[16.71px]">
                  상태
                </div>
              </div>
            </div>

            {/* 테이블 본문 */}
            <div className="divide-y divide-[#f3f4f6]">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-worker-neutral-500">로딩 중...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-worker-danger">
                    {error instanceof Error
                      ? error.message
                      : "출퇴근 내역을 불러오는데 실패했습니다."}
                  </p>
                </div>
              ) : attendanceList.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-worker-neutral-500">
                    출퇴근 내역이 없습니다.
                  </p>
                </div>
              ) : (
                attendanceList.map((item) => {
                  const statusDisplay = getStatusDisplay(
                    item.status,
                    item.isLate
                  );
                  return (
                    <div
                      key={item.attendanceId}
                      className="px-4 h-[81px] flex items-center"
                    >
                      <div className="grid grid-cols-4 gap-4 w-full items-center">
                        <div className="text-sm font-normal text-black text-left leading-[16.71px]">
                          {formatDate(item.date)}
                        </div>
                        <div className="text-sm font-normal text-black text-center leading-[16.71px]">
                          {item.checkInTime}
                        </div>
                        <div className="text-sm font-normal text-black text-center leading-[16.71px]">
                          {item.checkOutTime || "-"}
                        </div>
                        <div
                          className={`text-sm font-normal text-center leading-[16.71px] ${statusDisplay.color}`}
                        >
                          {statusDisplay.text}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 무한스크롤 트리거 */}
          {hasNextPage && <div ref={observerTarget} className="h-4" />}

          {/* 로딩 인디케이터 */}
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
