"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [autoLogin, setAutoLogin] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loginMutation = useLogin();

  const isValid = userId.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || loginMutation.isPending) return;

    setError(null);

    loginMutation.mutate(
      {
        username: userId.trim(),
        password,
        rememberMe: autoLogin,
      },
      {
        onError: (error) => {
          setError(error.message || "로그인에 실패했습니다.");
        },
      }
    );
  };

  return (
    <>
      <Header title="로그인" showBackButton />

      <div className="flex min-h-screen flex-col items-center px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[353px] flex-1 flex-col gap-6 pb-8"
        >
          <div className="space-y-5">
            <Input
              label="아이디"
              placeholder="아이디를 입력하세요"
              required
              fullWidth
              value={userId}
              onChange={(event) => {
                setUserId(event.target.value);
                setError(null);
              }}
              error={!!error}
              errorMessage={error || undefined}
            />

            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              required
              fullWidth
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
              }}
              error={!!error}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-worker-neutral-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border border-worker-neutral-300"
                  checked={autoLogin}
                  onChange={(event) => setAutoLogin(event.target.checked)}
                />
                <span>자동 로그인</span>
              </label>

              <button
                type="button"
                className="text-sm font-medium text-worker-primary-600"
                // TODO: 비밀번호 찾기 라우트 연결
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>
          </div>

          <div className="mt-auto space-y-4 pb-8">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loginMutation.isPending}
              disabled={!isValid || loginMutation.isPending}
              className="h-[46px] text-xl font-bold"
            >
              로그인
            </Button>

            <p className="text-center text-base text-worker-neutral-700">
              계정이 없으신가요?{" "}
              <Link
                href="/register"
                className="font-medium text-worker-primary-600"
              >
                회원가입하기
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
