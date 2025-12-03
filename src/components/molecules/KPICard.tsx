import { Card } from '@/components/atoms/Card';
import { Typography } from '@/components/atoms/Typography';

type KPICardProps = {
  label: string;
  value: string | number;
  subtext: string;
  variant?: 'success' | 'warning' | 'error' | 'default';
};

export const KPICard = ({ label, value, subtext, variant = 'default' }: KPICardProps) => {
  const borderColors = {
    success: 'border-t-4 border-t-green-500',
    warning: 'border-t-4 border-t-yellow-500',
    error: 'border-t-4 border-t-red-500',
    default: 'border-t-4 border-t-blue-500',
  };

  return (
    <Card className={borderColors[variant]}>
      <Typography variant="caption" className="text-gray-600 mb-2">
        {label}
      </Typography>
      <Typography variant="h2" className="text-3xl font-bold mb-2">
        {value}
      </Typography>
      <Typography variant="caption">{subtext}</Typography>
    </Card>
  );
};
