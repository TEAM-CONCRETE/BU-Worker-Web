import * as React from "react";

export interface IconProps {
  className?: string;
  fill?: string;
  width?: number | string;
  height?: number | string;
}

export const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { className, fill = "currentColor", width = 23, height = 20, ...props },
    ref
  ) => (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox="0 0 23 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_817_28139)">
        <path
          d="M22.4922 9.98047C22.4922 10.6836 21.9062 11.2344 21.2422 11.2344H19.9922L20.0195 17.4922C20.0195 17.5977 20.0117 17.7031 20 17.8086V18.4375C20 19.3008 19.3008 20 18.4375 20H17.8125C17.7695 20 17.7266 20 17.6836 19.9961C17.6289 20 17.5742 20 17.5195 20H16.25H15.3125C14.4492 20 13.75 19.3008 13.75 18.4375V17.5V15C13.75 14.3086 13.1914 13.75 12.5 13.75H10C9.30859 13.75 8.75 14.3086 8.75 15V17.5V18.4375C8.75 19.3008 8.05078 20 7.1875 20H6.25H5.00391C4.94531 20 4.88672 19.9961 4.82812 19.9922C4.78125 19.9961 4.73438 20 4.6875 20H4.0625C3.19922 20 2.5 19.3008 2.5 18.4375V14.0625C2.5 14.0273 2.5 13.9883 2.50391 13.9531V11.2344H1.25C0.546875 11.2344 0 10.6875 0 9.98047C0 9.62891 0.117188 9.31641 0.390625 9.04297L10.4062 0.3125C10.6797 0.0390625 10.9922 0 11.2656 0C11.5391 0 11.8516 0.078125 12.0859 0.273438L22.0625 9.04297C22.375 9.31641 22.5312 9.62891 22.4922 9.98047Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_817_28139">
          <path d="M0 0H22.5V20H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
);
HomeIcon.displayName = "HomeIcon";

export const ClockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { className, fill = "currentColor", width = 20, height = 20, ...props },
    ref
  ) => (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_817_28145)">
        <path
          d="M10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_817_28145">
          <path d="M0 0H20V20H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
);
ClockIcon.displayName = "ClockIcon";

export const MoneyIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { className, fill = "currentColor", width = 20, height = 20, ...props },
    ref
  ) => (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_817_28151)">
        <path
          d="M2.43766 2.10546C2.21891 1.44921 1.50798 1.09764 0.855633 1.31249C0.203289 1.52733 -0.15218 2.24217 0.0626642 2.89452L2.01579 8.74999H1.25016C0.558758 8.74999 0.00016424 9.30858 0.00016424 9.99999C0.00016424 10.6914 0.558758 11.25 1.25016 11.25H2.84782L5.06266 17.8945C5.23845 18.4219 5.74235 18.7695 6.29704 18.75C6.85173 18.7305 7.32829 18.3437 7.4611 17.8047L9.10173 11.25H10.8986L12.5392 17.8047C12.672 18.3437 13.1486 18.7305 13.7033 18.75C14.258 18.7695 14.7619 18.4219 14.9377 17.8945L17.1525 11.25H18.7502C19.4416 11.25 20.0002 10.6914 20.0002 9.99999C20.0002 9.30858 19.4416 8.74999 18.7502 8.74999H17.9845L19.9377 2.89452C20.1564 2.23827 19.8009 1.53124 19.1486 1.31249C18.4963 1.09374 17.7853 1.44921 17.5666 2.10155L15.3478 8.74999H12.8517L11.2111 2.1953C11.0744 1.64061 10.5744 1.24999 10.0002 1.24999C9.42595 1.24999 8.92595 1.64061 8.78923 2.1953L7.1486 8.74999H4.6486L2.43766 2.10546ZM5.48454 11.25H6.5236L6.07829 13.0312L5.48454 11.25ZM9.72673 8.74999L10.0002 7.65233L10.2736 8.74999H9.72673ZM13.4767 11.25H14.5158L13.922 13.0312L13.4767 11.25Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_817_28151">
          <path d="M0 0H20V20H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
);
MoneyIcon.displayName = "MoneyIcon";

export const PersonIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { className, fill = "currentColor", width = 18, height = 20, ...props },
    ref
  ) => (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_817_28157)">
        <path
          d="M8.75 10C10.0761 10 11.3479 9.47322 12.2855 8.53553C13.2232 7.59785 13.75 6.32608 13.75 5C13.75 3.67392 13.2232 2.40215 12.2855 1.46447C11.3479 0.526784 10.0761 0 8.75 0C7.42392 0 6.15215 0.526784 5.21447 1.46447C4.27678 2.40215 3.75 3.67392 3.75 5C3.75 6.32608 4.27678 7.59785 5.21447 8.53553C6.15215 9.47322 7.42392 10 8.75 10ZM6.96484 11.875C3.11719 11.875 0 14.9922 0 18.8398C0 19.4805 0.519531 20 1.16016 20H16.3398C16.9805 20 17.5 19.4805 17.5 18.8398C17.5 14.9922 14.3828 11.875 10.5352 11.875H6.96484Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_817_28157">
          <path d="M0 0H17.5V20H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
);
PersonIcon.displayName = "PersonIcon";
