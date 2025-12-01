export async function calculateHashFromBytes(
  data: Uint8Array
): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data as unknown as BufferSource
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
