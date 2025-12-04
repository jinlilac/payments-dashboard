// 가맹점 목록 조회

import { BaseAxios } from '@/libs/axios';
import { normalizedMerchantsAtom } from '@/stores/normalizedMerchantsAtom';
import type { MerchantResponse } from '@/types/merchants';
import { normalizeMerchants } from '@/utils/normalizeData';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useGetMerchantsQuery = () => {
  const setMerchants = useSetAtom(normalizedMerchantsAtom);

  return useQuery({
    queryKey: ['merchants', 'normalized'],
    queryFn: async () => {
      const response = await BaseAxios.get<MerchantResponse>('/merchants/details');

      const normalized = normalizeMerchants(response.data.data);
      setMerchants(normalized);

      return normalized;
    },
  });
};
