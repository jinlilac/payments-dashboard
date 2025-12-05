import { Button } from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import { Typography } from '@/components/atoms/Typography';
import { DateRangeCalendar } from '@/components/templates/DateRangeCalendar';
import { dateRangeAtom } from '@/stores/dateRangeAtom';
import { useAtomValue } from 'jotai';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export const Header = ({ title, subtitle }: HeaderProps) => {
  const dateRange = useAtomValue(dateRangeAtom);
  // 날짜 포매팅 (한국식)
  const formatDateKorean = (date: Date): string => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const displaySubtitle = subtitle || formatDateKorean(dateRange.startDate);

  return (
    <header className="flex flex-row justify-between items-center bg-white border-b border-gray-200 px-8 py-6">
      <Container as="div" layout="flex-col">
        <Typography variant="h2" weight="bold" className="mb-1">
          {title}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          {displaySubtitle} 기준
        </Typography>
      </Container>

      <div className="flex flex-row items-center gap-4">
        <Button variant="outline" size="md" className="mb-4" ariaLabel="다운로드 버튼">
          다운로드
        </Button>
        <DateRangeCalendar />
      </div>
    </header>
  );
};
