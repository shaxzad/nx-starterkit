import React, { forwardRef } from 'react';
import '../../tailwind.css';

const cn = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

const variants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  outline:
    'border border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white',
  primary400: 'bg-blue-400 text-white hover:bg-blue-500',
  'primaryOutline-400':
    'border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white',
  primary500: 'bg-blue-500 text-white hover:bg-blue-600',
  'primaryOutline-500':
    'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  'secondary-outline':
    'border border-gray-200 text-gray-700 bg-white hover:bg-gray-200',
  error: 'bg-red-500 text-white hover:bg-red-600',
  'error-outline':
    'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
  success: 'bg-green-500 text-white hover:bg-green-600',
  'success-outline':
    'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
  info: 'bg-blue-400 text-white hover:bg-blue-500',
  infoOutline:
    'border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
  warningOutline:
    'border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white',
  ghost: 'hover:bg-gray-100',
  link: 'text-blue-600 underline-offset-4 hover:underline',
};

const sizes = {
  default: 'py-3 px-3 font-semibold text-base rounded',
  sm: 'p-2 rounded text-sm font-medium',
  lg: 'py-3 px-3 font-semibold text-lg rounded',
  md: 'py-3 px-10 font-semibold text-base rounded',
  xs: 'py-2 px-3 font-semibold text-xs rounded',
  icon: 'h-10 w-10',
};

// Loading spinner component
const Loading = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    ></path>
  </svg>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  loadingIcon?: React.ReactElement;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      icon,
      iconPosition,
      loadingIcon = <Loading />,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full';

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && loadingIcon}
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
