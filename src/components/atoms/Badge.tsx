import cn from '@/libs/cn';

type BadgeProps = {
  status: 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md';
  children: string;
};

export const Badge = ({ status, size = 'sm', children }: BadgeProps) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors';

  const styles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-gray-100 text-gray-800',
  };
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  return (
    <span
      className={cn(baseStyles, styles[status], sizeStyles[size])}
      aria-label={`${status} ${children}`}
    >
      {children}
    </span>
  );
};
