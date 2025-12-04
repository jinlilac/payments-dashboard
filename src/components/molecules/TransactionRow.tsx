import type { Transaction } from '@/types/payment';
import { Badge } from '@/components/atoms/Badge';
import { useAtomValue } from 'jotai';
import { normalizedMerchantsAtom } from '@/stores/normalizedMerchantsAtom';
import { getMerchantName, getMerchantBizType, getStatusVariant } from '@/utils/normalizeData';

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const normalized = useAtomValue(normalizedMerchantsAtom);

  const payTypeMap: Record<string, string> = {
    DEVICE: '기기결제',
    MOBILE: '모바일',
    ONLINE: '온라인',
    BILLING: '빌링',
    VACT: '계좌이체',
  };

  const formatCurrency = (amount: number | string, currency: string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: currency || 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(date));
  };

  // 조회용 함수로 가맹점명 조회
  const merchantName = getMerchantName(normalized, transaction.mchtCode);
  const bizType = getMerchantBizType(normalized, transaction.mchtCode);

  return (
    <>
      <td className="px-6 py-3 text-sm">{transaction.paymentCode}</td>

      <td className="px-6 py-3 text-sm">
        <p className="font-medium">{merchantName}</p>
      </td>

      <td className="px-6 py-3 text-sm">
        <p className="text-xs text-gray-500">{bizType}</p>
      </td>

      <td className="px-6 py-3 text-sm">
        {formatCurrency(transaction.amount, transaction.currency)}
      </td>

      <td className="px-6 py-3 text-sm">
        {payTypeMap[transaction.payType] || transaction.payType}
      </td>

      <td className="px-6 py-3 text-sm">
        <Badge status={getStatusVariant(transaction.status)}>{transaction.status}</Badge>
      </td>

      <td className="px-6 py-3 text-sm">{formatDate(transaction.paymentAt)}</td>
    </>
  );
};
