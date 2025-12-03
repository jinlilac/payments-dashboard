import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  ariaLabel,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const baseStyle =
    'font-semibold rounded-btn transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyle = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
  };

  const sizeStyle = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`}
      aria-label={ariaLabel}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
