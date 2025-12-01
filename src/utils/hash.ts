/**
 * 바이너리 데이터의 해시값을 계산합니다 (SHA-256)
 */
export async function calculateHashFromBytes(
  data: Uint8Array
): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

/**
 * Base64 이미지 데이터에서 해시값을 계산합니다
 * 서버에서 업로드된 이미지 바이너리를 해시하는 것과 동일하게 계산합니다.
 */
export async function calculateImageHash(base64Data: string): Promise<string> {
  // data:image/png;base64, 부분 제거
  const base64String = base64Data.includes(",")
    ? base64Data.split(",")[1]
    : base64Data;

  // Base64를 바이너리로 디코딩
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // 바이너리 데이터를 해시
  return calculateHashFromBytes(byteArray);
}
