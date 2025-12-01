"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/common";
import { PdfViewer } from "@/components/ui/pdf-viewer";
import { useSafetyLogDocument } from "@/hooks/useSafetyLogDocument";

export default function SafetyLogViewPage() {
  const params = useParams();
  const router = useRouter();
  const safetyLogId = Number(params.safetyLogId);

  const {
    data: documentData,
    isLoading,
    error,
    refetch,
  } = useSafetyLogDocument(safetyLogId);

  // 에러 발생 시 재시도
  React.useEffect(() => {
    if (error) {
      const retryTimer = setTimeout(() => {
        refetch();
      }, 2000);
      return () => clearTimeout(retryTimer);
    }
  }, [error, refetch]);

  const handleBackClick = () => {
    router.push("/home");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-worker-neutral-50">
        <Header
          title="안전교육일지"
          showBackButton
          onBackClick={handleBackClick}
        />
        <div className="flex items-center justify-center flex-1 pt-20">
          <p className="text-sm text-worker-neutral-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !documentData?.data) {
    return (
      <div className="flex min-h-screen flex-col bg-worker-neutral-50">
        <Header
          title="안전교육일지"
          showBackButton
          onBackClick={handleBackClick}
        />
        <div className="flex items-center justify-center flex-1 pt-20">
          <p className="text-sm text-worker-danger">
            {error instanceof Error
              ? error.message
              : "문서를 불러오는데 실패했습니다."}
          </p>
        </div>
      </div>
    );
  }

  const documentUrl = documentData.data.url;

  return (
    <div className="flex min-h-screen flex-col bg-worker-neutral-50 pb-24">
      <Header
        title="안전교육일지"
        showBackButton
        onBackClick={handleBackClick}
      />
      <div className="flex w-full max-w-[353px] mx-auto flex-col px-4 pt-20">
        <section className="mb-4">
          <p className="text-sm text-worker-neutral-500 mb-2">
            계약 내용을 확인하고 서명해주세요.
          </p>
        </section>

        <section>
          <div className="bg-white rounded-2xl border border-worker-neutral-200 p-4">
            <PdfViewer pdfUrl={documentUrl} className="min-h-[600px]" />
          </div>
        </section>
      </div>
    </div>
  );
}
