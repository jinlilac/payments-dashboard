import { type SelectHTMLAttributes } from 'react';

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLSelectElement>;
}

export const Select = ({
  label,
  options,
  error,
  helperText,
  fullWidth = false,
  variant = 'outlined',
  size = 'md',
  placeholder,
  icon,
  className = '',
  disabled = false,
  value,
  onChange,
  ref,
  ...props
}: SelectProps) => {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 appearance-none cursor-pointer';

  const variants = {
    outlined: `border-2 border-gray-300 bg-white text-gray-900
        hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500
        disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`,
    filled: `border-b-2 border-gray-300 bg-gray-100 text-gray-900
        hover:bg-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500
        disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const errorStyle = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  // Custom chevron icon SVG
  const chevronIcon = icon ? (
    icon
  ) : (
    <svg
      className="w-5 h-5 pointer-events-none"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );

  return (
    <div className={`flex flex-col gap-1 ${widthClass}`}>
      {label && (
        <label className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}>
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${errorStyle} ${widthClass} pr-10 ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          {chevronIcon}
        </div>
      </div>

      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
    </div>
  );
};

Select.displayName = 'Select';
