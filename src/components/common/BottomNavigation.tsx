"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { HomeIcon, ClockIcon, MoneyIcon, PersonIcon } from "./icons";

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<IconProps>;
}

interface IconProps {
  fill?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const navigationItems: NavigationItem[] = [
  {
    label: "홈",
    href: "/home",
    icon: HomeIcon,
  },
  {
    label: "출근/퇴근",
    href: "/attendance",
    icon: ClockIcon,
  },
  {
    label: "급여",
    href: "/salary",
    icon: MoneyIcon,
  },
  {
    label: "마이페이지",
    href: "/mypage",
    icon: PersonIcon,
  },
];

export interface BottomNavigationProps {
  className?: string;
}

export const BottomNavigation = React.forwardRef<
  HTMLElement,
  BottomNavigationProps
>(({ className }, ref) => {
  const pathname = usePathname();

  return (
    <nav
      ref={ref}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-white border-t border-worker-neutral-200",
        "safe-area-inset-bottom",
        className
      )}
      role="navigation"
      aria-label="하단 네비게이션"
    >
      <div className="flex items-center justify-around h-20 px-4">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                "min-w-0 flex-1 h-full",
                "transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-worker-primary-600 focus-visible:ring-offset-2",
                "rounded-lg py-2"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                fill={isActive ? "#1f70b7" : "#9ca3af"}
                width={isActive ? 22.5 : 20}
                height={isActive ? 20 : 20}
                className="mb-2"
              />
              <span
                className={cn(
                  "text-xs font-bold transition-colors",
                  isActive
                    ? "text-worker-primary-600"
                    : "text-worker-neutral-400"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

BottomNavigation.displayName = "BottomNavigation";

export default BottomNavigation;
