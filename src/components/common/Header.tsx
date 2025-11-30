"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon } from "./icons";

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    { title, showBackButton = false, onBackClick, rightAction, className },
    ref
  ) => {
    const router = useRouter();

    const handleBackClick = () => {
      if (onBackClick) {
        onBackClick();
      } else {
        router.back();
      }
    };

    return (
      <header
        ref={ref}
        className={cn(
          "fixed top-0 left-0 right-0 z-40",
          "bg-worker-neutral-50",
          className
        )}
        role="banner"
      >
        <div className="flex items-center justify-between h-[56px] px-4">
          {/* 왼쪽: 뒤로가기 버튼 */}
          <div className="flex items-center min-w-0 flex-shrink-0">
            {showBackButton && (
              <button
                type="button"
                onClick={handleBackClick}
                className={cn(
                  "flex items-center justify-center",
                  "w-8 h-8 -ml-2",
                  "text-worker-neutral-600 hover:text-worker-primary-600",
                  "transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-worker-primary-600 focus-visible:ring-offset-2 rounded",
                  "cursor-pointer"
                )}
                aria-label="뒤로가기"
              >
                <ChevronLeftIcon
                  fill="currentColor"
                  width={24}
                  height={24}
                  className="flex-shrink-0"
                />
              </button>
            )}
          </div>

          {/* 중앙: 제목 */}
          <h1
            className={cn(
              "flex-1 text-center",
              "text-xl font-semibold leading-[33px]",
              "text-worker-primary-700",
              "truncate",
              showBackButton ? "ml-2" : "",
              rightAction ? "mr-2" : ""
            )}
          >
            {title}
          </h1>

          {/* 오른쪽: 옵션 버튼 */}
          <div className="flex items-center min-w-0 flex-shrink-0">
            {rightAction && (
              <div className="flex items-center justify-center">
                {rightAction}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

export default Header;
