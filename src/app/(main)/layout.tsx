"use client";

import * as React from "react";
import { BottomNavigation } from "@/components/common";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen pb-20 safe-area-inset-top safe-area-inset-bottom">
        {/* 콘텐츠 영역 - 모바일 우선, 최대 너비 393px (모바일 기준) */}
        <div className="w-full max-w-[393px] mx-auto">{children}</div>
      </main>
      {/* 하단 네비게이션 바 */}
      <BottomNavigation />
    </div>
  );
}
