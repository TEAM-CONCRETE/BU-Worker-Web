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
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const onSignatureChangeRef = React.useRef(onSignatureChange);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [canvasSize, setCanvasSize] = React.useState({
    width: 400,
    height: 176,
  });

  // onSignatureChange callback의 최신 참조 유지
  React.useEffect(() => {
    onSignatureChangeRef.current = onSignatureChange;
  }, [onSignatureChange]);

  // 컨테이너 크기에 맞춰 canvas 해상도 설정
  React.useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setCanvasSize({ width: width || 400, height: 176 });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // canvas 크기 변경 시 isEmpty 상태 업데이트
  // canvas 크기가 변경되면 내용이 지워지므로 상태를 동기화
  React.useEffect(() => {
    if (canvasRef.current) {
      const empty = canvasRef.current.isEmpty();
      setIsEmpty(empty);
      // canvasSize 변경 시에만 onSignatureChange 호출
      onSignatureChangeRef.current?.(empty);
    }
  }, [canvasSize.width, canvasSize.height]);

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
        <div ref={containerRef} className="relative">
          <SignatureCanvas
            ref={canvasRef}
            canvasProps={{
              className: "w-full border border-worker-neutral-200 rounded-lg",
              style: { touchAction: "none", height: "176px" },
              width: canvasSize.width,
              height: canvasSize.height,
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
