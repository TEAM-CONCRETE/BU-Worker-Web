"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/common";
import { PdfViewer } from "@/components/ui/pdf-viewer";
import { useContractDocument } from "@/hooks/useContractDocument";

export default function ContractViewPage() {
  const params = useParams();
  const router = useRouter();
  const contractId = Number(params.contractId);

  const {
    data: documentData,
    isLoading,
    error,
    refetch,
  } = useContractDocument(contractId);

  const retryCountRef = React.useRef(0);
  const maxRetries = 3;

  React.useEffect(() => {
    if (error && retryCountRef.current < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 10000);
      const retryTimer = setTimeout(() => {
        retryCountRef.current += 1;
        refetch();
      }, delay);
      return () => clearTimeout(retryTimer);
    } else if (!error) {
      retryCountRef.current = 0;
    }
  }, [error, refetch]);

  const handleBackClick = () => {
    router.push("/home");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-worker-neutral-50">
        <Header
          title="근로계약서"
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
          title="근로계약서"
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
      <Header title="근로계약서" showBackButton onBackClick={handleBackClick} />
      <div className="flex w-full max-w-[353px] mx-auto flex-col px-4 pt-20">
        <section className="mb-4">
          <p className="text-sm text-worker-neutral-500 mb-2">
            서명이 완료된 계약서입니다.
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
