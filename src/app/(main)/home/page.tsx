"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownToast = React.useRef(false);

  React.useEffect(() => {
    const registered = searchParams.get("registered");

    if (registered === "true" && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("얼굴 등록이 완료되었습니다!");

      router.replace("/home");
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-worker-neutral-900">
        Build-Up 근로자 홈
      </h1>
      <p className="mt-4 text-center text-worker-neutral-600">
        홈 페이지 구현 예정
      </p>
    </div>
  );
}
