import type { Transaction } from '@/types/payment';
import { atom } from 'jotai';

export const paymentsAtom = atom<Transaction[]>([]);
