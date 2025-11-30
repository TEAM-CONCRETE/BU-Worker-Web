"use client";

import * as React from "react";

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (address: string) => void;
}

interface DaumPostcodeData {
  zonecode: string;
  address: string;
  addressEnglish: string;
  addressType: "R" | "J";
  bname: string;
  buildingName: string;
}

interface DaumPostcode {
  new (options: {
    oncomplete: (data: DaumPostcodeData) => void;
    onclose?: () => void;
    width?: string | number;
    height?: string | number;
  }): {
    embed: (element: HTMLElement) => void;
  };
}

interface DaumWindow {
  daum?: {
    Postcode: DaumPostcode;
  };
}

export function AddressSearchModal({
  isOpen,
  onClose,
  onComplete,
}: AddressSearchModalProps) {
  const addressModalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const modalElement = addressModalRef.current;
    if (!modalElement) return;

    // 다음 주소 API 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    const checkDaumLoaded = () => {
      const daumWindow = window as unknown as DaumWindow;
      if (typeof window !== "undefined" && daumWindow.daum) {
        const daumApi = daumWindow.daum;
        if (!daumApi || !modalElement) {
          alert(
            "주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요."
          );
          onClose();
          return;
        }

        const postcode = new daumApi.Postcode({
          oncomplete: (data: DaumPostcodeData) => {
            let fullAddress = data.address;
            let extraAddress = "";

            if (data.addressType === "R") {
              if (data.bname !== "") {
                extraAddress += data.bname;
              }
              if (data.buildingName !== "") {
                extraAddress +=
                  extraAddress !== ""
                    ? `, ${data.buildingName}`
                    : data.buildingName;
              }
              fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
            }

            onComplete(fullAddress);
            onClose();
          },
          onclose: () => {
            onClose();
          },
          width: "100%",
          height: "100%",
        });

        postcode.embed(modalElement);
      } else {
        // 스크립트가 아직 로드되지 않았으면 재시도
        setTimeout(checkDaumLoaded, 100);
      }
    };

    checkDaumLoaded();

    return () => {
      // 컴포넌트 언마운트 시 정리
      if (modalElement) {
        modalElement.innerHTML = "";
      }
      const existingScript = document.querySelector(
        'script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [isOpen, onClose, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className="relative w-full max-w-[353px] bg-white rounded-lg overflow-hidden shadow-lg flex flex-col"
        style={{ height: "85vh", maxHeight: "600px" }}
      >
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-bold text-worker-neutral-900">
            주소 검색
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-worker-neutral-500 hover:text-worker-neutral-700"
            aria-label="닫기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          ref={addressModalRef}
          className="w-full overflow-auto"
          style={{ height: "calc(85vh - 80px)", maxHeight: "520px" }}
        />
      </div>
    </div>
  );
}
