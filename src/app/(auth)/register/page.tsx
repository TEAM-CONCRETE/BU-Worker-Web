"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { useCheckUserIdExists } from "@/hooks/useCheckUserIdExists";

export default function RegisterPage() {
  const [empName, setEmpName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [secretKey, setSecretKey] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [agreePrivacy, setAgreePrivacy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isUserIdChecked, setIsUserIdChecked] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<{
    empName?: string;
    userId?: string;
    password?: string;
    confirmPassword?: string;
    secretKey?: string;
  }>({});

  const registerMutation = useRegister();
  const checkUserIdMutation = useCheckUserIdExists();

  const handleCheckUserId = async () => {
    if (!userId.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        userId: "아이디를 입력해주세요.",
      }));
      return;
    }

    setIsUserIdChecked(false);
    setFieldErrors((prev) => ({ ...prev, userId: undefined }));

    checkUserIdMutation.mutate(userId.trim(), {
      onSuccess: (response) => {
        if (response.success && response.data) {
          if (response.data.exists) {
            setFieldErrors((prev) => ({
              ...prev,
              userId: "이미 사용 중인 아이디입니다.",
            }));
            setIsUserIdChecked(false);
          } else {
            setIsUserIdChecked(true);
            setFieldErrors((prev) => ({ ...prev, userId: undefined }));
          }
        }
      },
      onError: (error) => {
        setFieldErrors((prev) => ({
          ...prev,
          userId: error.message || "중복확인에 실패했습니다.",
        }));
        setIsUserIdChecked(false);
      },
    });
  };

  // 비밀번호 강도 검증 (영문, 숫자, 특수문자 포함, 8자 이상)
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    if (!empName.trim()) {
      errors.empName = "이름을 입력해주세요.";
    }

    if (!userId.trim()) {
      errors.userId = "아이디를 입력해주세요.";
    } else if (!isUserIdChecked) {
      errors.userId = "아이디 중복확인을 해주세요.";
    }

    if (!password) {
      errors.password = "비밀번호를 입력해주세요.";
    } else if (!validatePassword(password)) {
      errors.password =
        "영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!secretKey.trim()) {
      errors.secretKey = "시크릿키를 입력해주세요.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const passwordMatching = password === confirmPassword && password.length > 0;

  const isValid =
    empName.trim().length > 0 &&
    userId.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    secretKey.trim().length > 0 &&
    agreeTerms &&
    agreePrivacy &&
    passwordMatching &&
    isUserIdChecked;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || registerMutation.isPending) return;

    if (!validateForm()) {
      return;
    }

    setError(null);

    registerMutation.mutate(
      {
        empName: empName.trim(),
        userId: userId.trim(),
        password,
        confirmPassword,
        secretKey: secretKey.trim(),
        agreeTerms,
        agreePrivacy,
        passwordMatching,
      },
      {
        onError: (error) => {
          setError(error.message || "회원가입에 실패했습니다.");
        },
      }
    );
  };

  return (
    <>
      <Header title="회원가입" showBackButton />

      <div className="flex min-h-screen flex-col items-center px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[353px] flex-1 flex-col gap-6 pb-8"
        >
          <div className="space-y-5">
            <Input
              label="이름"
              placeholder="이름을 입력하세요"
              required
              fullWidth
              value={empName}
              onChange={(event) => {
                setEmpName(event.target.value);
                setError(null);
                if (fieldErrors.empName) {
                  setFieldErrors((prev) => ({ ...prev, empName: undefined }));
                }
              }}
              error={!!fieldErrors.empName}
              errorMessage={fieldErrors.empName}
            />

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  label="아이디"
                  placeholder="아이디를 입력하세요"
                  required
                  fullWidth
                  value={userId}
                  onChange={(event) => {
                    setUserId(event.target.value);
                    setError(null);
                    setIsUserIdChecked(false);
                    if (fieldErrors.userId) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        userId: undefined,
                      }));
                    }
                  }}
                  error={!!fieldErrors.userId}
                  errorMessage={fieldErrors.userId}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleCheckUserId}
                  disabled={!userId.trim() || checkUserIdMutation.isPending}
                  className="h-12 px-4 mt-6 whitespace-nowrap"
                  loading={checkUserIdMutation.isPending}
                >
                  중복확인
                </Button>
              </div>
              {isUserIdChecked && (
                <p className="text-sm text-worker-success">
                  사용 가능한 아이디입니다.
                </p>
              )}
            </div>

            <Input
              type="password"
              label="비밀번호"
              placeholder="8자 이상 입력하세요"
              required
              fullWidth
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }
                if (confirmPassword && event.target.value !== confirmPassword) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    confirmPassword: "비밀번호가 일치하지 않습니다.",
                  }));
                } else if (confirmPassword) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }
              }}
              error={!!fieldErrors.password}
              errorMessage={fieldErrors.password}
              helperText="영문, 숫자, 특수문자 포함"
            />

            <Input
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요"
              required
              fullWidth
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setError(null);
                if (event.target.value !== password) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    confirmPassword: "비밀번호가 일치하지 않습니다.",
                  }));
                } else {
                  setFieldErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }
              }}
              error={!!fieldErrors.confirmPassword}
              errorMessage={fieldErrors.confirmPassword}
            />

            <Input
              label="시크릿키"
              placeholder="시크릿키를 입력하세요"
              required
              fullWidth
              value={secretKey}
              onChange={(event) => {
                setSecretKey(event.target.value);
                setError(null);
                if (fieldErrors.secretKey) {
                  setFieldErrors((prev) => ({ ...prev, secretKey: undefined }));
                }
              }}
              error={!!fieldErrors.secretKey}
              errorMessage={fieldErrors.secretKey}
            />

            {error && <p className="text-sm text-worker-danger">{error}</p>}

            <div className="space-y-3 pt-2">
              <label className="inline-flex items-center gap-2 text-sm text-worker-neutral-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border border-worker-neutral-300"
                  checked={agreeTerms}
                  onChange={(event) => setAgreeTerms(event.target.checked)}
                  required
                />
                <span>
                  서비스 이용약관에 동의합니다{" "}
                  <span className="text-worker-danger">*</span>
                </span>
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-worker-neutral-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border border-worker-neutral-300"
                  checked={agreePrivacy}
                  onChange={(event) => setAgreePrivacy(event.target.checked)}
                  required
                />
                <span>
                  개인정보 처리방침에 동의합니다{" "}
                  <span className="text-worker-danger">*</span>
                </span>
              </label>
            </div>
          </div>

          <div className="mt-auto space-y-4 pb-8">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={registerMutation.isPending}
              disabled={!isValid || registerMutation.isPending}
              className="h-[46px] text-xl font-bold"
            >
              회원가입
            </Button>

            <p className="text-center text-base text-worker-neutral-700">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-medium text-worker-primary-600"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
