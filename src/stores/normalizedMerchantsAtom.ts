import { atom } from 'jotai';
import type { NormalizedMerchants } from '@/types/merchants';

export const normalizedMerchantsAtom = atom<NormalizedMerchants>({
  name: {},
  bizType: {},
  status: {},
  email: {},
  phone: {},
  registeredAt: {},
  allCodes: [],
});
