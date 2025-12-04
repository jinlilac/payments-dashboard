import { BaseAxios } from '@/libs/axios';
import { paymentsAtom } from '@/stores/paymentAtoms';
import type { TransactionResponse } from '@/types/payment';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useGetPaymentsQuery = () => {
  const setPayments = useSetAtom(paymentsAtom);
  return useQuery({
    queryKey: ['payments', 'list'],
    queryFn: async () => {
      const response = await BaseAxios.get<TransactionResponse>('/payments/list');
      setPayments(response.data.data);

      return response.data.data;
    },
  });
};
