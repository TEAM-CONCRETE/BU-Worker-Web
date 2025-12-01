import * as React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {/* 인증 페이지는 하단 네비게이션 바 없음 */}
      <main className="min-h-screen safe-area-inset-bottom">{children}</main>
    </div>
  );
}
