import { useAtomValue } from 'jotai';
import { paymentsAtom } from '@/stores/paymentAtoms';
import { dateRangeAtom } from '@/stores/dateRangeAtom';

export const useFilteredPayments = () => {
  const payments = useAtomValue(paymentsAtom);
  const dateRange = useAtomValue(dateRangeAtom);

  return payments.filter((payment) => {
    const paymentDate = new Date(payment.paymentAt);
    return paymentDate >= dateRange.startDate && paymentDate <= dateRange.endDate;
  });
};
