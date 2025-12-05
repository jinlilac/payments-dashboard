import { useMemo } from 'react';
import { useFilteredPayments } from './useFilteredPayments';

interface DailyRevenueData {
  [key: string]: string | number;
  name: string;
  value: number;
}

/**
 * 일일 거래 추이 데이터를 계산하는 Hook
 *
 * 기능:
 * - useFilteredPayments에서 기간 필터링된 결제 데이터 사용
 * - 날짜별로 거래 금액 누적
 * - 시간순 정렬 (오래된 것부터)
 *
 * 출력 형식:
 * [
 *   { name: '2025-12-04', value: 500000 },
 *   { name: '2025-12-05', value: 620000 },
 *   { name: '2025-12-06', value: 480000 },
 *   ...
 * ]
 */
export const useDailyRevenueData = (): DailyRevenueData[] => {
  const filteredPayments = useFilteredPayments();

  return useMemo(() => {
    const dailyMap = new Map<string, number>();

    if (!Array.isArray(filteredPayments)) return [];

    filteredPayments.forEach((payment) => {
      if (payment.status !== 'SUCCESS') return;

      const paymentDate = new Date(payment.paymentAt);
      const dateStr = paymentDate.toISOString().split('T')[0];

      const amount = Number(payment.amount) || 0;

      if (amount === 0) return;

      const current = dailyMap.get(dateStr) || 0;
      dailyMap.set(dateStr, current + amount);
    });

    let result = Array.from(dailyMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // 최근 7일
    if (result.length > 7) {
      result = result.slice(-7);
    }

    return result;
  }, [filteredPayments]);
};
