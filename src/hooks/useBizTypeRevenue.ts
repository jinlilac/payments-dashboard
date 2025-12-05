import { useFilteredPayments } from '@/hooks/useFilteredPayments';
import { normalizedMerchantsAtom } from '@/stores/normalizedMerchantsAtom';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

interface BusinessTypeData {
  [key: string]: string | number;
  name: string;
  value: number;
}

export const useBusinessTypeRevenue = (): BusinessTypeData[] => {
  const payments = useFilteredPayments();

  const merchants = useAtomValue(normalizedMerchantsAtom);

  return useMemo(() => {
    const bizTypeMap = new Map<string, number>();

    if (!Array.isArray(payments)) {
      return [];
    }

    payments.forEach((payment) => {
      if (payment.status !== 'SUCCESS') {
        return;
      }

      // mchtCode로 bizType 찾기
      const mchtCode = payment.mchtCode || '';
      const bizType = merchants.bizType?.[mchtCode] || '미지정';

      const amount = Number(payment.amount) || 0;

      if (amount === 0) {
        return;
      }

      const current = bizTypeMap.get(bizType) || 0;
      bizTypeMap.set(bizType, current + amount);
    });

    const result: BusinessTypeData[] = Array.from(bizTypeMap).map(([name, value]) => ({
      name,
      value,
    }));

    return result.sort((a, b) => b.value - a.value);
  }, [payments, merchants]);
};
