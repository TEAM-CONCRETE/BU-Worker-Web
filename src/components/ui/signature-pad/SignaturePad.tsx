"use client";

import * as React from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
  onSignatureChange?: (isEmpty: boolean) => void;
  onSignatureComplete?: (signatureData: string) => void;
  className?: string;
}

export const SignaturePad = React.forwardRef<
  { getSignature: () => string | null; isEmpty: () => boolean },
  SignaturePadProps
>(({ onSignatureChange, onSignatureComplete, className }, ref) => {
  const canvasRef = React.useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = React.useState(true);

  // 외부에서 서명 데이터를 가져올 수 있도록 ref 노출
  React.useImperativeHandle(ref, () => ({
    getSignature: () => {
      if (!canvasRef.current || canvasRef.current.isEmpty()) {
        return null;
      }
      return canvasRef.current.toDataURL("image/png");
    },
    isEmpty: () => {
      return canvasRef.current?.isEmpty() ?? true;
    },
  }));

  const handleEnd = () => {
    if (!canvasRef.current) return;

    const isEmptyNow = canvasRef.current.isEmpty();
    setIsEmpty(isEmptyNow);

    if (!isEmptyNow) {
      const signatureData = canvasRef.current.toDataURL("image/png");
      onSignatureComplete?.(signatureData);
    }

    onSignatureChange?.(isEmptyNow);
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setIsEmpty(true);
      onSignatureChange?.(true);
    }
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="bg-white rounded-xl border border-worker-neutral-200 p-4">
        <div className="relative">
          <SignatureCanvas
            ref={canvasRef}
            canvasProps={{
              className: "w-full border border-worker-neutral-200 rounded-lg",
              style: { touchAction: "none", height: "176px" },
            }}
            onEnd={handleEnd}
            backgroundColor="#ffffff"
            penColor="#000000"
          />
          {!isEmpty && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 px-2 py-1 text-xs text-worker-neutral-600 bg-white border border-worker-neutral-200 rounded hover:bg-worker-neutral-50"
            >
              지우기
            </button>
          )}
        </div>
        {isEmpty && (
          <div className="mt-2 text-center">
            <p className="text-sm text-worker-neutral-500">
              서명을 추가하려면 여기를 클릭하세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

SignaturePad.displayName = "SignaturePad";
