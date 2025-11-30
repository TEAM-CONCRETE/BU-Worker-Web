const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface ApiError {
  success: false;
  message: string;
  code: string;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      success: false,
      message: "알 수 없는 오류가 발생했습니다.",
      code: "UNKNOWN_ERROR",
    }));

    throw new Error(error.message || "요청에 실패했습니다.");
  }

  return response.json();
}
