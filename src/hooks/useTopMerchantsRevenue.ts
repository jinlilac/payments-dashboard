import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { normalizedMerchantsAtom } from '@/stores/normalizedMerchantsAtom';
import { useFilteredPayments } from '@/hooks/useFilteredPayments';

interface MerchantData {
  [key: string]: string | number;
  name: string;
  value: number;
}

export const useTopMerchantsRevenue = (limit?: number): MerchantData[] => {
  const payments = useFilteredPayments();

  const merchants = useAtomValue(normalizedMerchantsAtom);

  return useMemo(() => {
    const merchantMap = new Map<string, number>();

    if (!Array.isArray(payments)) return [];

    payments.forEach((payment) => {
      if (payment.status !== 'SUCCESS') return;

      const mchtCode = payment.mchtCode;
      const merchantName = merchants.name?.[mchtCode] || mchtCode || '미지정';
      const amount = Number(payment.amount) || 0;

      if (amount === 0) return;

      const current = merchantMap.get(merchantName) || 0;
      merchantMap.set(merchantName, current + amount);
    });

    let result = Array.from(merchantMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    if (limit && limit > 0) {
      result = result.slice(0, limit);
    }

    return result;
  }, [payments, merchants, limit]);
};
