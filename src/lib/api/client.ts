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

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    const url = `${API_BASE_URL}/api/v1/auth/token/refresh`;

    refreshPromise = (async () => {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        try {
          const { useAuthStore } = await import("@/store/authStore");
          useAuthStore.getState().logout();
        } catch {
          // authStore import 실패 시는 무시
        }

        throw new Error("토큰 재발급에 실패했습니다.");
      }

      try {
        const data = await response.json();
        if (data?.success && data?.data) {
          const { useAuthStore } = await import("@/store/authStore");
          useAuthStore.getState().setUser(data.data);
        }
      } catch {
        // JSON 파싱 실패 시에도 토큰은 쿠키로 갱신된 상태이므로 치명적이지 않음
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
  _retry = true
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

  const doRequest = async (): Promise<Response> => {
    return fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
  };

  let response = await doRequest();

  if (
    (response.status === 401 || response.status === 403) &&
    !normalizedEndpoint.includes("/v1/auth/token/refresh") &&
    _retry
  ) {
    try {
      await refreshAccessToken();
      response = await doRequest();
    } catch {
      // 리프레시 실패 시에는 이후 로직에서 에러 처리
      response = response;
    }
  }

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
