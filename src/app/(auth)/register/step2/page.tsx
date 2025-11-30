"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddressSearchModal } from "@/components/ui/address-search-modal";
import { useRegisterStep2 } from "@/hooks/useRegisterStep2";
import { useRegisterStore } from "@/store/registerStore";
import { formatResidentNum } from "@/utils/formatResidentNum";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

export default function RegisterStep2Page() {
  const router = useRouter();
  const profileToken = useRegisterStore((state) => state.profileToken);
  const [residentNum, setResidentNum] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [empAddress, setEmpAddress] = React.useState("");
  const [detailAddress, setDetailAddress] = React.useState("");
  const [emergencyRelation, setEmergencyRelation] = React.useState("");
  const [emergencyName, setEmergencyName] = React.useState("");
  const [emergencyPhone, setEmergencyPhone] = React.useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<{
    residentNum?: string;
    phone?: string;
    email?: string;
    empAddress?: string;
    emergencyPhone?: string;
  }>({});

  const registerStep2Mutation = useRegisterStep2();

  // 다음 주소 검색 모달 열기
  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };

  // 주소 선택 완료 핸들러
  const handleAddressComplete = (address: string) => {
    setEmpAddress(address);
    setDetailAddress("");
  };

  // 주민등록번호 형식 검증 (6자리-7자리)
  const validateResidentNum = (residentNum: string): boolean => {
    const residentNumRegex = /^\d{6}-\d{7}$/;
    return residentNumRegex.test(residentNum);
  };

  // 전화번호 형식 검증
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // 이메일 형식 검증
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 전체 유효성 검사
  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    if (!residentNum.trim()) {
      errors.residentNum = "주민등록번호를 입력해주세요.";
    } else if (!validateResidentNum(residentNum)) {
      errors.residentNum =
        "올바른 주민등록번호 형식이 아닙니다. (예: 123456-1234567)";
    }

    if (!phone.trim()) {
      errors.phone = "전화번호를 입력해주세요.";
    } else if (!validatePhone(phone)) {
      errors.phone = "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)";
    }

    if (!email.trim()) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(email)) {
      errors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!empAddress.trim()) {
      errors.empAddress = "주소를 검색해주세요.";
    }

    if (emergencyPhone && !validatePhone(emergencyPhone)) {
      errors.emergencyPhone =
        "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 필수 입력값 확인
  const isValid =
    residentNum.trim().length > 0 &&
    phone.trim().length > 0 &&
    email.trim().length > 0 &&
    empAddress.trim().length > 0;

  // profileToken 검증
  React.useEffect(() => {
    if (!profileToken) {
      router.push("/register");
    }
  }, [profileToken, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || registerStep2Mutation.isPending) return;

    // 유효성 검사 실행
    if (!validateForm()) {
      return;
    }

    setError(null);

    registerStep2Mutation.mutate(
      {
        residentNum: residentNum.trim(),
        phone: phone.trim().replace(/-/g, ""),
        email: email.trim(),
        empAddress: `${empAddress} ${detailAddress}`.trim(),
        emergencyPhone: emergencyPhone.trim().replace(/-/g, ""),
      },
      {
        onError: (error) => {
          setError(error.message || "정보입력에 실패했습니다.");
        },
      }
    );
  };

  return (
    <>
      <Header title="정보입력" showBackButton />

      <div className="flex min-h-screen flex-col items-center px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[353px] flex-1 flex-col gap-6 pb-8"
        >
          <div className="space-y-5">
            <Input
              label="주민등록번호"
              placeholder="123456-1234567"
              required
              fullWidth
              value={residentNum}
              onChange={(event) => {
                const formatted = formatResidentNum(event.target.value);
                setResidentNum(formatted);
                setError(null);
                if (fieldErrors.residentNum) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    residentNum: undefined,
                  }));
                }
              }}
              error={!!fieldErrors.residentNum}
              errorMessage={fieldErrors.residentNum}
            />

            <Input
              type="tel"
              label="전화번호"
              placeholder="010-1234-5678"
              required
              fullWidth
              value={phone}
              onChange={(event) => {
                const formatted = formatPhoneNumber(event.target.value);
                setPhone(formatted);
                setError(null);
                if (fieldErrors.phone) {
                  setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                }
              }}
              error={!!fieldErrors.phone}
              errorMessage={fieldErrors.phone}
            />

            <Input
              type="email"
              label="이메일"
              placeholder="name@example.com"
              required
              fullWidth
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError(null);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              error={!!fieldErrors.email}
              errorMessage={fieldErrors.email}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-worker-neutral-700">
                주소
              </label>
              <Button
                type="button"
                variant="outline"
                size="md"
                fullWidth
                className="h-14 text-base text-worker-primary-600 border-worker-primary-600"
                onClick={handleAddressSearch}
              >
                주소 검색
              </Button>
              <Input
                label=""
                placeholder="기본 주소"
                fullWidth
                value={empAddress}
                readOnly
                className="bg-worker-neutral-50"
                error={!!fieldErrors.empAddress}
                errorMessage={fieldErrors.empAddress}
              />
              <Input
                label=""
                placeholder="상세 주소 (동/호수 등)"
                fullWidth
                value={detailAddress}
                onChange={(event) => {
                  setDetailAddress(event.target.value);
                  setError(null);
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-worker-neutral-700">
                비상연락망
              </label>
              <p className="text-xs text-worker-neutral-500">
                현장 비상상황 시에만 사용됩니다.
              </p>
              <div className="flex gap-2">
                <select
                  value={emergencyRelation}
                  onChange={(event) => setEmergencyRelation(event.target.value)}
                  className="h-12 px-4 rounded-lg border border-worker-neutral-200 bg-white text-sm focus:outline-none focus:border-worker-primary-600 focus:border-2"
                >
                  <option value="">관계 선택</option>
                  <option value="배우자">배우자</option>
                  <option value="부모">부모</option>
                  <option value="형제/자매">형제/자매</option>
                  <option value="기타">기타</option>
                </select>
                <Input
                  label=""
                  placeholder="이름"
                  fullWidth
                  value={emergencyName}
                  onChange={(event) => {
                    setEmergencyName(event.target.value);
                    setError(null);
                  }}
                />
              </div>
              <Input
                type="tel"
                label=""
                placeholder="010-1234-5678"
                fullWidth
                value={emergencyPhone}
                onChange={(event) => {
                  const formatted = formatPhoneNumber(event.target.value);
                  setEmergencyPhone(formatted);
                  setError(null);
                  if (fieldErrors.emergencyPhone) {
                    setFieldErrors((prev) => ({
                      ...prev,
                      emergencyPhone: undefined,
                    }));
                  }
                }}
                error={!!fieldErrors.emergencyPhone}
                errorMessage={fieldErrors.emergencyPhone}
              />
            </div>

            {error && <p className="text-sm text-worker-danger">{error}</p>}
          </div>

          <AddressSearchModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            onComplete={handleAddressComplete}
          />

          <div className="mt-auto space-y-4 pb-8">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={registerStep2Mutation.isPending}
              disabled={!isValid || registerStep2Mutation.isPending}
              className="h-[46px] text-xl font-bold"
            >
              다음
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
