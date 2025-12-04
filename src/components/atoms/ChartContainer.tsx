import type { ReactNode } from 'react';
import cn from '@/libs/cn';

interface ChartContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const ChartContainer = ({
  children,
  title,
  description,
  className,
}: ChartContainerProps) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200 p-6', className)}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      )}

      <div className="w-full h-96">{children}</div>
    </div>
  );
};
