"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownToast = React.useRef(false);
  const user = useAuthStore((state) => state.user);

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

        {/* 미결 전자계약 섹션 (조건부) */}
        {/* TODO: API 연동 후 실제 데이터로 교체 */}
        {true && (
          <section className="mb-6">
            <div className="bg-white rounded-2xl border border-worker-neutral-200 p-6">
              <h2 className="text-base font-semibold text-worker-primary-600 mb-4">
                미결 전자계약: 2건
              </h2>
              <div className="space-y-3">
                <button
                  type="button"
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
                <button
                  type="button"
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
              </div>
            </div>
          </section>
        )}

        {/* 최근 급여 내역 섹션 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-[#12436d] mb-4">
            💰 최근 급여 내역
          </h2>
          <div className="bg-white rounded-2xl border border-worker-neutral-200 p-6">
            {/* TODO: API 연동 후 실제 데이터로 교체 */}
            <h3 className="text-base font-bold text-worker-neutral-900 text-center mb-2">
              이천 A 아파트 현장
            </h3>
            <p className="text-sm text-worker-neutral-500 text-center mb-4">
              2025.09.01 - 2025.09.30
            </p>
            <div className="mb-6">
              <p className="text-[36px] font-extrabold text-worker-primary-600 text-center">
                180,000₩
              </p>
            </div>
            <button
              type="button"
              className="w-full bg-worker-neutral-50 rounded-lg border border-worker-neutral-200 py-3 text-sm font-medium text-worker-neutral-700 hover:bg-worker-neutral-100 transition-colors"
            >
              상세보기
            </button>
          </div>
        </section>

        {/* 금일 근태 내역 섹션 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-[#12436d] mb-4">
            🕒 금일 근태 내역
          </h2>
          <div className="bg-worker-neutral-100 rounded-xl border border-worker-neutral-200 p-6">
            {/* TODO: API 연동 후 실제 데이터로 교체 */}
            <div className="text-center">
              <p className="text-[30px] font-bold text-worker-primary-600 mb-2">
                출근
              </p>
              <p className="text-base text-worker-neutral-700">
                2025.09.20 09:20:31
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
