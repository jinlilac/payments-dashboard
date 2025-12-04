import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

interface DateRangeDisplayProps {
  startDate: Date;
  endDate: Date;
  onOpenCalendar: () => void;
  formatDate: (date: Date) => string;
}

export const DateRangeDisplay = ({
  startDate,
  endDate,
  onOpenCalendar,
  formatDate,
}: DateRangeDisplayProps) => (
  <div className="flex items-end gap-2 mb-4">
    <div className="flex-1">
      <Input
        label="발생 기간"
        value={`${formatDate(startDate)} → ${formatDate(endDate)}`}
        onClick={onOpenCalendar}
        readOnly
        variant="outlined"
        size="md"
        fullWidth
        icon="📅"
        iconPosition="right"
      />
    </div>
    <Button onClick={onOpenCalendar} variant="secondary" size="md" ariaLabel="달력 열기">
      📅
    </Button>
  </div>
);
