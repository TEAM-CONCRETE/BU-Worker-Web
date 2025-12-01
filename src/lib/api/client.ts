const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface ApiError {
  success: false;
  message: string;
  code: string;
}

interface ApiClientError extends Error {
  code: string;
  status: number;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith("/api")
    ? endpoint
    : `/api${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;

  // headers 병합: options의 headers가 우선순위를 가짐
  const headers = new Headers(options?.headers);
  if (!headers.has("Content-Type") && options?.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    let error: ApiError;
    try {
      const errorText = await response.text();
      error = JSON.parse(errorText);
    } catch {
      error = {
        success: false,
        message: `요청에 실패했습니다. (${response.status})`,
        code: `HTTP_${response.status}`,
      };
    }

    const errorMessage = error.message || "요청에 실패했습니다.";
    const errorWithDetails = new Error(errorMessage) as ApiClientError;
    errorWithDetails.code = error.code;
    errorWithDetails.status = response.status;
    throw errorWithDetails;
  }

  return response.json();
}
