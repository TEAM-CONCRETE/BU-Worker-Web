export async function calculateHashFromBytes(
  data: Uint8Array
): Promise<string> {
  // Web Crypto API는 BufferSource를 요구하므로 ArrayBuffer로 변환해서 전달
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data.buffer as ArrayBuffer
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function calculateImageHash(base64Data: string): Promise<string> {
  const base64String = base64Data.includes(",")
    ? base64Data.split(",")[1]
    : base64Data;

  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return calculateHashFromBytes(byteArray);
}
