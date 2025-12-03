import type { ReactNode } from 'react';
import Container from '@/components/atoms/Container';

type CardProps = {
  children: ReactNode;
  variant?: 'default' | 'elevated';
  ariaLabel?: string;
  className?: string;
};

export const Card = ({ children, variant = 'default', className, ariaLabel }: CardProps) => {
  const baseStyle = 'bg-white rounded-lg p-6';
  const variantStyles = {
    default: 'shadow-sm border border-gray-200',
    elevated: 'shadow-lg',
  };
  return (
    <Container
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </Container>
  );
};
