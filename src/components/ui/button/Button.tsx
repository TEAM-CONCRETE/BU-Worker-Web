import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const variantStyles = {
      primary:
        "bg-worker-primary-600 text-white hover:bg-worker-primary-700 active:bg-worker-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-worker-primary-600 focus-visible:ring-offset-2",
      secondary:
        "bg-worker-primary-50 text-worker-primary-700 hover:bg-worker-primary-100 active:bg-worker-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-worker-primary-600 focus-visible:ring-offset-2",
      outline:
        "border border-worker-primary-600 text-worker-primary-600 bg-transparent hover:bg-worker-primary-50 active:bg-worker-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-worker-primary-600 focus-visible:ring-offset-2",
      ghost:
        "text-worker-neutral-700 bg-transparent hover:bg-worker-neutral-100 active:bg-worker-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-worker-neutral-400 focus-visible:ring-offset-2",
      danger:
        "bg-worker-danger text-white hover:bg-red-600 active:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-worker-danger focus-visible:ring-offset-2",
    };

    const sizeStyles = {
      sm: "h-10 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    const disabledStyles =
      "bg-worker-disabled text-worker-neutral-500 cursor-not-allowed hover:bg-worker-disabled active:bg-worker-disabled";

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-bold transition-colors",
          "disabled:pointer-events-none",
          isDisabled ? disabledStyles : variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
