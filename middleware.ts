import { NextResponse, type NextRequest } from "next/server";

// 보호할 경로 (로그인된 사용자만 접근 가능)
const PROTECTED_PATH_PREFIXES = [
  // (main) 그룹 하위 페이지들
  "/home",
  "/attendance",
  "/salary",
  "/contract",
  "/safety-log",
  "/mypage",
  // (auth) 그룹 중 보호 대상
  "/register/step3",
];

const AUTH_COOKIE_CANDIDATES = ["refreshToken"];

function isProtectedPath(pathname: string) {
  // 정적 파일, Next 내부 경로는 제외
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico"
  ) {
    return false;
  }

  return PROTECTED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function hasAuthCookie(request: NextRequest) {
  const cookies = request.cookies;
  return AUTH_COOKIE_CANDIDATES.some((name) => cookies.has(name));
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtected = isProtectedPath(pathname);
  const isAuthenticated = hasAuthCookie(request);

  // 비인증 상태에서 보호된 경로 접근 시 로그인 페이지로 리다이렉트
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/home") {
      const redirectTo = pathname + (search || "");
      loginUrl.searchParams.set("redirect", redirectTo);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 이미 로그인된 사용자가 로그인/회원가입 페이지로 접근 시 홈으로 리다이렉트
  if (isAuthenticated && pathname === "/login") {
    const homeUrl = new URL("/home", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  // 정적 파일 및 Next 내부 리소스를 제외한 모든 경로에 대해 미들웨어 실행
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
