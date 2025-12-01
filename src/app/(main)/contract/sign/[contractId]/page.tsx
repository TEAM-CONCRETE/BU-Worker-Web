"use client";

import * as React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Header } from "@/components/common";
import { PdfViewer } from "@/components/ui/pdf-viewer";
import { SignaturePad } from "@/components/ui/signature-pad";
import { useAuthStore } from "@/store/authStore";
import { useContractDocument } from "@/hooks/useContractDocument";
import { useSubmitContractSignature } from "@/hooks/useSubmitContractSignature";

export default function ContractSignPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const contractId = Number(params.contractId);
  const user = useAuthStore((state) => state.user);

  // 쿼리 파라미터에서 siteId 가져오기, 없으면 user에서 가져오기
  const siteId = searchParams.get("siteId")
    ? Number(searchParams.get("siteId"))
    : user?.siteId;

  const [signatureData, setSignatureData] = React.useState<string | null>(null);
  const [isSignatureEmpty, setIsSignatureEmpty] = React.useState(true);
  const signaturePadRef = React.useRef<{
    getSignature: () => string | null;
    isEmpty: () => boolean;
  } | null>(null);

  const {
    data: documentData,
    isLoading,
    error,
  } = useContractDocument(contractId);
  const submitSignatureMutation = useSubmitContractSignature();

  const handleSignatureChange = (isEmpty: boolean) => {
    setIsSignatureEmpty(isEmpty);
  };

  const handleSignatureComplete = (data: string) => {
    setSignatureData(data);
  };

  const handleSubmit = () => {
    if (!contractId || !siteId) {
      return;
    }

    // 서명 패드에서 직접 서명 데이터 가져오기
    let finalSignatureData = signatureData;
    if (signaturePadRef.current) {
      const currentSignature = signaturePadRef.current.getSignature();
      if (currentSignature) {
        finalSignatureData = currentSignature;
      }
    }

    if (!finalSignatureData || isSignatureEmpty) {
      return;
    }

    submitSignatureMutation.mutate({
      siteId,
      contractId,
      signatureBase64: finalSignatureData,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-worker-neutral-50">
        <Header title="근로계약서 서명" showBackButton />
        <div className="flex items-center justify-center flex-1 pt-20">
          <p className="text-sm text-worker-neutral-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !documentData?.data) {
    return (
      <div className="flex min-h-screen flex-col bg-worker-neutral-50">
        <Header title="근로계약서 서명" showBackButton />
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
      <Header title="근로계약서 서명" showBackButton />
      <div className="flex w-full max-w-[353px] mx-auto flex-col px-4 pt-20">
        <section className="mb-4">
          <p className="text-sm text-worker-neutral-500 mb-2">
            계약 내용을 확인하고 서명해주세요.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-normal text-worker-neutral-900 mb-2">
            근로계약서 확인
          </h2>
          <div className="bg-white rounded-2xl border border-worker-neutral-200 p-4">
            <PdfViewer pdfUrl={documentUrl} className="min-h-[400px]" />
          </div>
        </section>

        <section className="mb-4">
          <p className="text-xs text-worker-neutral-400 text-center">
            문서를 충분히 확인 후 아래에 서명해주세요.
          </p>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-normal text-worker-neutral-900">
              전자서명
            </h2>
            <div className="relative group">
              <button
                type="button"
                className="text-worker-neutral-500 hover:text-worker-neutral-700"
                aria-label="서명 안내"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-worker-neutral-800 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                본인 이름과 유사하게 서명하세요.
              </div>
            </div>
          </div>
          <SignaturePad
            ref={signaturePadRef}
            onSignatureChange={handleSignatureChange}
            onSignatureComplete={handleSignatureComplete}
          />
        </section>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSignatureEmpty || submitSignatureMutation.isPending}
          className={`w-full rounded-lg py-3 text-base font-normal transition-colors ${
            isSignatureEmpty || submitSignatureMutation.isPending
              ? "bg-worker-neutral-200 text-worker-neutral-500 cursor-not-allowed"
              : "bg-worker-primary-600 text-white hover:bg-worker-primary-700"
          }`}
        >
          {submitSignatureMutation.isPending ? "제출 중..." : "완료"}
        </button>
      </div>
    </div>
  );
}
