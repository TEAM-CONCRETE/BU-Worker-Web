import * as faceapi from "face-api.js";

let modelsLoaded = false;

export async function loadFaceApiModels(): Promise<void> {
  if (modelsLoaded) {
    return;
  }

  const MODEL_URL = "/models";

  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
    ]);

    modelsLoaded = true;
    console.log("face-api.js 모델 로딩 완료");
  } catch (error) {
    console.error("face-api.js 모델 로딩 실패:", error);
    throw new Error("얼굴 인식 모델을 불러오는데 실패했습니다.");
  }
}

/**
 * 비디오에서 얼굴 감지
 */
export async function detectFace(videoElement: HTMLVideoElement) {
  const detection = await faceapi
    .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks(true);

  return detection;
}

/**
 * 얼굴이 정면을 향하고 있는지 확인
 */
export function isFaceAligned(landmarks: faceapi.FaceLandmarks68): boolean {
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const nose = landmarks.getNose();

  // 왼쪽 눈과 오른쪽 눈의 중심점 계산
  const leftEyeCenter = leftEye.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 }
  );
  leftEyeCenter.x /= leftEye.length;
  leftEyeCenter.y /= leftEye.length;

  const rightEyeCenter = rightEye.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 }
  );
  rightEyeCenter.x /= rightEye.length;
  rightEyeCenter.y /= rightEye.length;

  // 코의 중심점 계산
  const noseCenter = nose.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 }
  );
  noseCenter.x /= nose.length;

  // 얼굴의 중심점 (두 눈의 중점)
  const faceCenterX = (leftEyeCenter.x + rightEyeCenter.x) / 2;

  // 코가 얼굴 중심에서 크게 벗어나지 않았는지 확인
  const deviation = Math.abs(noseCenter.x - faceCenterX);
  const eyeDistance = Math.abs(rightEyeCenter.x - leftEyeCenter.x);

  // 편차가 눈 간격의 20% 이내면 정면으로 판단
  return deviation < eyeDistance * 0.2;
}

/**
 * Canvas에 얼굴 감지 결과 그리기 (랜드마크만 표시)
 */
export function drawDetection(
  canvas: HTMLCanvasElement,
  videoElement: HTMLVideoElement,
  detection: faceapi.WithFaceLandmarks<
    {
      detection: faceapi.FaceDetection;
    },
    faceapi.FaceLandmarks68
  >
) {
  const displaySize = {
    width: videoElement.videoWidth,
    height: videoElement.videoHeight,
  };

  faceapi.matchDimensions(canvas, displaySize);

  const resizedDetection = faceapi.resizeResults(detection, displaySize);

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 네모 테두리(detection box)는 그리지 않고 랜드마크만 표시
    // faceapi.draw.drawDetections(canvas, resizedDetection); // 이 줄 제거
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
  }
}
