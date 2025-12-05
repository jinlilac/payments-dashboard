import { type InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const Input = ({
  label,
  error,
  helperText,
  fullWidth = false,
  variant = 'outlined',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  ref,
  ...props
}: InputProps) => {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    outlined: `border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-400
        hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500
        disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-500`,
    filled: `border-b-2 border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500
        hover:bg-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500
        disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-500`,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const errorStyle = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  const iconPaddingClass = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';

  return (
    <div className={`flex flex-col gap-1 ${widthClass}`}>
      {label && (
        <label className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}>
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 flex items-center text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${errorStyle} ${iconPaddingClass} ${widthClass} ${className}`}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 flex items-center text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
      </div>

      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
    </div>
  );
};

Input.displayName = 'Input';
