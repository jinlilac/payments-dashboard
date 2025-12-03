import { Typography } from '@/components/atoms/Typography';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <Typography variant="h1" className="mb-1">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body-sm" color="secondary">
          {subtitle}
        </Typography>
      )}
    </header>
  );
};
