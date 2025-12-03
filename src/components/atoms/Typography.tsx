import type { JSX, ReactNode } from 'react';
import cn from '@/libs/cn';

type TypographyProps = {
  children: ReactNode;
  className?: string;
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'caption';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
};

export const Typography = ({ variant, weight, color, className, children }: TypographyProps) => {
  const variantStyles = {
    h1: 'text-4xl font-bold',
    h2: 'text-2xl font-semibold',
    h3: 'text-lg font-semibold',
    body: 'text-base text-gray-900',
    'body-sm': 'text-sm font-normal leading-normal',
    caption: 'text-xs text-gray-600',
  };
  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  const colorStyles = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-500',
  };

  const defaultComponents = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    'body-sm': 'p',
    caption: 'span',
  } as const;

  const Component = defaultComponents[variant] as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={cn(
        variantStyles[variant],
        weight && weightStyles[weight],
        color ? colorStyles[color] : 'text-gray-900',
        className
      )}
    >
      {children}
    </Component>
  );
};
