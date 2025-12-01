"use client";

import * as React from "react";
import { Header } from "@/components/common";
import { useRegisterFace } from "@/hooks/useRegisterFace";
import {
  loadFaceApiModels,
  detectFace,
  isFaceAligned,
  drawDetection,
} from "@/utils/faceDetection";

type FaceRegistrationStep = "detecting" | "aligning" | "liveness" | "captured";

export default function RegisterStep3Page() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const detectionIntervalRef = React.useRef<number | null>(null);
  const livenessTimeoutRef = React.useRef<number | null>(null);
  const isCapturingRef = React.useRef(false);

  const [currentStep, setCurrentStep] =
    React.useState<FaceRegistrationStep>("detecting");
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = React.useState(false);

  const registerFaceMutation = useRegisterFace();

  // face-api.js 모델 로딩
  React.useEffect(() => {
    const loadModels = async () => {
      try {
        await loadFaceApiModels();
        setModelsLoaded(true);
      } catch (err) {
        console.error("모델 로딩 오류:", err);
        setError("얼굴 인식 모델을 불러오는데 실패했습니다.");
      }
    };

    loadModels();
  }, []);

  // 카메라 권한 요청 및 스트림 시작
  React.useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (err) {
        console.error("카메라 접근 오류:", err);
        setError("카메라 접근 권한이 필요합니다.");
      }
    };

    startCamera();

    return () => {
      // 컴포넌트 언마운트 시 스트림 정리
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (detectionIntervalRef.current) {
        window.clearInterval(detectionIntervalRef.current);
      }
      if (livenessTimeoutRef.current) {
        window.clearTimeout(livenessTimeoutRef.current);
      }
    };
  }, []);

  // 얼굴 캡처
  const captureFace = React.useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setIsCompleted(true);

            // 감지 루프 중지
            if (detectionIntervalRef.current) {
              window.clearInterval(detectionIntervalRef.current);
            }

            // 자동으로 업로드 및 home으로 이동
            registerFaceMutation.mutate(blob, {
              onError: (error) => {
                setError(error.message || "얼굴 등록에 실패했습니다.");
                setIsCompleted(false);
              },
            });
          }
        },
        "image/jpeg",
        0.95
      );
    }
  }, [registerFaceMutation]);

  // 얼굴 감지 및 검증 루프
  React.useEffect(() => {
    if (!modelsLoaded || !videoRef.current || isCompleted) return;

    const runDetection = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      try {
        const detection = await detectFace(videoRef.current);

        if (detection) {
          // 얼굴 감지 성공
          if (currentStep === "detecting") {
            setCurrentStep("aligning");
          }

          // Canvas에 감지 결과 그리기
          drawDetection(canvasRef.current, videoRef.current, detection);

          // 정면 정렬 확인
          if (currentStep === "aligning") {
            const aligned = isFaceAligned(detection.landmarks);
            if (aligned && !isCapturingRef.current) {
              setCurrentStep("liveness");
              isCapturingRef.current = true;

              // 기존 timeout이 있으면 정리
              if (livenessTimeoutRef.current) {
                window.clearTimeout(livenessTimeoutRef.current);
              }

              // 간단한 라이브니스 감지 (여기서는 1초 대기 후 캡처로 간주)
              livenessTimeoutRef.current = window.setTimeout(() => {
                setCurrentStep("captured");
                captureFace();
                livenessTimeoutRef.current = null;
              }, 1000);
            }
          }
        } else {
          // 얼굴 미감지 시 Canvas 초기화
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) {
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }
        }
      } catch (err) {
        console.error("얼굴 감지 오류:", err);
      }
    };

    // 100ms마다 얼굴 감지 실행
    detectionIntervalRef.current = window.setInterval(runDetection, 100);

    return () => {
      if (detectionIntervalRef.current) {
        window.clearInterval(detectionIntervalRef.current);
      }
      if (livenessTimeoutRef.current) {
        window.clearTimeout(livenessTimeoutRef.current);
      }
    };
  }, [modelsLoaded, currentStep, isCompleted, captureFace]);

  const getStepStatus = (step: FaceRegistrationStep) => {
    const steps: FaceRegistrationStep[] = [
      "detecting",
      "aligning",
      "liveness",
      "captured",
    ];
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);

    // 현재 단계보다 이전 단계이거나 완료된 경우
    if (
      stepIndex < currentIndex ||
      (isCompleted && stepIndex <= currentIndex)
    ) {
      return "completed";
    } else {
      return "pending";
    }
  };

  return (
    <>
      <Header title="얼굴 등록" showBackButton />

      <div className="flex min-h-screen flex-col items-center px-4 pt-20">
        <div className="flex w-full max-w-[353px] flex-1 flex-col pb-8">
          {/* 진행 상태 표시 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  getStepStatus("detecting") === "completed"
                    ? "bg-worker-primary-600"
                    : "bg-worker-neutral-300"
                }`}
              />
              <p className="text-xs text-worker-neutral-600">얼굴 감지</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  getStepStatus("aligning") === "completed"
                    ? "bg-worker-primary-600"
                    : "bg-worker-neutral-300"
                }`}
              />
              <p className="text-xs text-worker-neutral-600">정면 정렬</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  getStepStatus("liveness") === "completed"
                    ? "bg-worker-primary-600"
                    : "bg-worker-neutral-300"
                }`}
              />
              <p className="text-xs text-worker-neutral-600">라이브니스 감지</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  getStepStatus("captured") === "completed"
                    ? "bg-worker-primary-600"
                    : "bg-worker-neutral-300"
                }`}
              />
              <p className="text-xs text-worker-neutral-500">캡처 완료</p>
            </div>
          </div>

          {isCompleted && (
            <p className="text-center text-base text-[#12436d] mb-6">
              얼굴 등록이 완료되었습니다
            </p>
          )}

          {/* 카메라 영역 */}
          <div className="relative w-full aspect-square max-w-[335px] mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />

              {/* 원형 가이드 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-4 border-worker-primary-600" />
              </div>

              {/* 캡처 완료 배지 */}
              {isCompleted && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 rounded-lg px-4 py-2">
                    <p className="text-white text-lg">캡처 완료!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mt-auto space-y-4">
            <p className="text-center text-xs text-worker-neutral-500">
              얼굴 이미지는 출퇴근 인증 용도로만 사용되며 암호화되어 저장됩니다.
            </p>
          </div>

          {error && (
            <p className="text-sm text-worker-danger text-center mt-4">
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
