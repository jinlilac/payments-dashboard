import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/atoms/Button';

interface CalendarModalProps {
  showCalendar: boolean;
  selectingStart: boolean;
  dateRange: { startDate: Date; endDate: Date };
  onDateClick: (date: Date) => void;
  onClose: () => void;
  formatDate: (date: Date) => string;
}

export const CalendarModal = ({
  showCalendar,
  selectingStart,
  dateRange,
  onDateClick,
  onClose,
  formatDate,
}: CalendarModalProps) => {
  if (!showCalendar) return null;

  return (
    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-6 w-full sm:w-auto">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* 달력 영역 */}
        <div className="flex flex-col">
          <DayPicker
            mode="range"
            selected={{
              from: dateRange.startDate,
              to: dateRange.endDate,
            }}
            onDayClick={onDateClick}
            locale={ko}
            showOutsideDays={true}
            fixedWeeks={true}
            disabled={(date) => {
              if (!selectingStart) {
                return date < dateRange.startDate;
              }
              return false;
            }}
            modifiersClassNames={{
              selected: 'bg-blue-500 text-white font-bold rounded-md',
              today: 'bg-blue-200 font-bold rounded-md',
              disabled: 'text-gray-300 cursor-not-allowed',
              range_start: 'bg-blue-500 text-white ',
              range_end: 'bg-blue-500 text-white ',
              range_middle: 'bg-blue-200 text-gray-900',
            }}
            footer={
              <div className="text-center text-lg text-gray-700 mt-4 pt-4 border-t border-gray-200">
                {dateRange.startDate && dateRange.endDate
                  ? `${formatDate(dateRange.startDate)} ~ ${formatDate(dateRange.endDate)}`
                  : '날짜를 선택하세요'}
              </div>
            }
          />
          <Button onClick={onClose} variant="primary" size="md" className="w-full mt-2">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};
