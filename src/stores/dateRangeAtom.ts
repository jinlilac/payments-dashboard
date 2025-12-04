import { atom } from 'jotai';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

const getDefaultDateRange = (): DateRange => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return {
    startDate: thirtyDaysAgo,
    endDate: today,
  };
};

export const dateRangeAtom = atom<DateRange>(getDefaultDateRange());
