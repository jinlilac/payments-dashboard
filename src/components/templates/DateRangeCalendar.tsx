import { useState } from 'react';
import { useAtom } from 'jotai';
import { format, isAfter, isSameDay } from 'date-fns';
import { dateRangeAtom } from '@/stores/dateRangeAtom';
import { DateRangeDisplay } from '@/components/molecules/DateRangeDisplay';
import { CalendarModal } from '@/components/organisms/CalendarModal';
import 'react-day-picker/dist/style.css';

export const DateRangeCalendar = () => {
  const [dateRange, setDateRange] = useAtom(dateRangeAtom);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingStart, setSelectingStart] = useState(true);

  /**
   * 달력에서 날짜 선택 핸들러
   * 시작일 선택 후 종료일을 선택
   */
  const handleDateClick = (date: Date) => {
    if (selectingStart) {
      // 시작일 선택
      setDateRange((prev) => ({
        ...prev,
        startDate: date,
      }));
      setSelectingStart(false);
    } else {
      // 종료일 선택 (시작일보다 뒤에 있어야 함)
      if (isAfter(date, dateRange.startDate) || isSameDay(date, dateRange.startDate)) {
        setDateRange((prev) => ({
          ...prev,
          endDate: date,
        }));
        setShowCalendar(false);
        setSelectingStart(true); // 다음 선택을 위해 리셋
      } else {
        alert('종료일이 시작일보다 뒤여야 합니다.');
      }
    }
  };

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

  const handleOpenCalendar = () => {
    setShowCalendar(true);
    setSelectingStart(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
    setSelectingStart(true);
  };

  return (
    <div className="relative w-full flex-1">
      <DateRangeDisplay
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onOpenCalendar={handleOpenCalendar}
        formatDate={formatDate}
      />

      <CalendarModal
        showCalendar={showCalendar}
        selectingStart={selectingStart}
        dateRange={dateRange}
        onDateClick={handleDateClick}
        onClose={handleCloseCalendar}
        formatDate={formatDate}
      />
    </div>
  );
};
