import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled";
  label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  fullWidth?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      size = "md",
      variant = "default",
      label,
      helperText,
      errorMessage,
      error = false,
      fullWidth = false,
      disabled,
      required,
      prefix,
      suffix,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperTextId = `${inputId}-helper`;
    const errorMessageId = `${inputId}-error`;

    const hasError = error || !!errorMessage;

    const sizeStyles = {
      sm: "h-10 px-3 text-sm",
      md: "h-12 px-4 text-base",
      lg: "h-14 px-5 text-lg",
    };

    const variantStyles = {
      default: "bg-white border border-worker-neutral-200",
      filled: "bg-worker-neutral-50 border border-transparent",
    };

    const stateStyles = hasError
      ? "border-worker-danger focus:border-worker-danger focus:border-2"
      : "focus:border-worker-primary-600 focus:border-2";

    const disabledStyles = disabled
      ? "bg-worker-neutral-100 text-worker-neutral-400 cursor-not-allowed"
      : "";

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-worker-neutral-700"
          >
            {label}
            {required && <span className="text-worker-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-worker-neutral-500">
              {prefix}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            id={inputId}
            disabled={disabled}
            required={required}
            className={cn(
              "w-full rounded-lg font-normal transition-colors",
              "placeholder:text-worker-placeholder",
              "focus:outline-none",
              "disabled:pointer-events-none",
              sizeStyles[size],
              variantStyles[variant],
              stateStyles,
              disabledStyles,
              prefix && "pl-10",
              suffix && "pr-10",
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorMessageId : helperText ? helperTextId : undefined
            }
            aria-required={required}
            {...props}
          />

          {suffix && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-worker-neutral-500">
              {suffix}
            </div>
          )}
        </div>

        {!hasError && helperText && (
          <p id={helperTextId} className="text-sm text-worker-neutral-500">
            {helperText}
          </p>
        )}

        {hasError && errorMessage && (
          <p
            id={errorMessageId}
            className="text-sm text-worker-danger"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
