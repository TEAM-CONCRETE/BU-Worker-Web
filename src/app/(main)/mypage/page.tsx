"use client";

import * as React from "react";
import { Header } from "@/components/common";
import { useAuthStore } from "@/store/authStore";

export default function MyPage() {
  const user = useAuthStore((state) => state.user);

  const userName = user?.userName ?? "근로자님";
  const userId = user?.userId ?? "-";
  const appVersion = "Build-Up v1.0.3";

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb] pb-24 relative">
      <Header title="마이페이지" />

      <div className="flex w-full max-w-[353px] mx-auto flex-col pt-[56px] px-4">
        <section className="mt-3">
          <div className="bg-white rounded-2xl border border-[#e5e7eb] px-4 py-5 flex flex-col items-center">
            <div className="w-[72px] h-[72px] rounded-full bg-[#e5e7eb] flex items-center justify-center mb-4">
              <span className="text-[28px] text-[#4b5563] font-medium">
                {userName.charAt(0)}
              </span>
            </div>
            <p className="text-lg text-[#111827] mb-1 text-center">
              {userName}
            </p>
            <p className="text-sm text-[#6b7280] mb-1 text-center">{userId}</p>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-base text-[#12436d] mb-3">계정 설정</h2>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full bg-white rounded-xl border border-[#e5e7eb] px-4 py-4 flex items-center justify-between active:bg-[#f3f4f6] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">🔑</span>
                <span className="text-sm text-[#111827]">비밀번호 변경</span>
              </div>
              <span className="text-xs text-[#9ca3af]">&gt;</span>
            </button>

            <button
              type="button"
              className="w-full bg-white rounded-xl border border-[#e5e7eb] px-4 py-4 flex items-center justify-between active:bg-[#f3f4f6] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">📄</span>
                <span className="text-sm text-[#111827]">개인정보 수정</span>
              </div>
              <span className="text-xs text-[#9ca3af]">&gt;</span>
            </button>

            <button
              type="button"
              className="w-full bg-white rounded-xl border border-[#e5e7eb] px-4 py-4 flex items-center justify-between active:bg-[#f3f4f6] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">🚪</span>
                <span className="text-sm text-[#111827]">로그아웃</span>
              </div>
              <span className="text-xs text-[#9ca3af]">&gt;</span>
            </button>

            <button
              type="button"
              className="w-full bg-white rounded-xl border border-[#e5e7eb] px-4 py-4 flex items-center justify-between active:bg-[#fef2f2] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">❌</span>
                <span className="text-sm text-[#ef4444]">계정 탈퇴</span>
              </div>
              <span className="text-xs text-[#9ca3af]">&gt;</span>
            </button>
          </div>
        </section>

        <section className="mt-8 mb-6 flex flex-col items-center gap-3">
          <p className="text-sm text-[#9ca3af] text-center">{appVersion}</p>
          <button
            type="button"
            className="text-sm text-[#1f70b7] underline-offset-2 underline"
          >
            문의하기 (평일 9-18시)
          </button>
        </section>
      </div>
    </div>
  );
}
