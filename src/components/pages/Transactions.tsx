import { useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';

// 컴포넌트
import { Container } from '@/components/atoms/Container';
import { TransactionTable } from '@/components/organisms/TransactionTable';
import {
  TransactionFilters,
  type TransactionFilters as ITransactionFilters,
} from '@/components/organisms/TransactionFilters';

import { useGetPaymentsQuery } from '@/apis/Payments';
import { useGetMerchantsQuery } from '@/apis/Merchants';
// Atoms
import { paymentsAtom } from '@/stores/paymentAtoms';

// 로딩 스켈레톤
import LoadingSkeleton from '@/components/organisms/Skeleton';
import { Typography } from '@/components/atoms/Typography';
import { dateRangeAtom } from '@/stores/dateRangeAtom';

export default function TransactionsPage() {
  // 📊 데이터 조회
  const { isLoading: paymentsLoading } = useGetPaymentsQuery();
  const { isLoading: merchantsLoading } = useGetMerchantsQuery();

  // 원본 데이터
  const payments = useAtomValue(paymentsAtom);

  const { startDate: headerStartDate, endDate: headerEndDate } = useAtomValue(dateRangeAtom);
  // 🔄 로딩 상태 관리
  const isLoading = paymentsLoading || merchantsLoading;
  const isReady = !isLoading && payments.length > 0;

  // 📦 필터 로컬 상태
  const [currentFilters, setCurrentFilters] = useState<ITransactionFilters>({
    merchantId: null,
    status: 'ALL',
    payType: 'ALL',
  });

  // ⚙️ 기간 필터 범위 설정 (포함)
  const getDateRange = () => {
    const start = new Date(headerStartDate);
    start.setHours(0, 0, 0, 0); // 시작일 00:00:00

    const end = new Date(headerEndDate);
    end.setHours(23, 59, 59, 999); // 종료일 23:59:59

    return { start, end };
  };

  // 🔍 필터링된 거래 내역 계산
  const filteredTransactions = useMemo(() => {
    if (!Array.isArray(payments)) return [];

    const { start: startTime, end: endTime } = getDateRange();

    return payments.filter((payment) => {
      // 1️⃣ 기간 필터
      const paymentDate = new Date(payment.paymentAt);
      if (paymentDate < startTime || paymentDate > endTime) {
        return false;
      }

      // 2️⃣ 가맹점 필터 (null이면 전체)
      if (currentFilters.merchantId !== null && payment.mchtCode !== currentFilters.merchantId) {
        return false;
      }

      // 3️⃣ 결제상태 필터
      if (currentFilters.status !== 'ALL' && payment.status !== currentFilters.status) {
        return false;
      }

      // 4️⃣ 결제수단 필터
      if (currentFilters.payType !== 'ALL' && payment.payType !== currentFilters.payType) {
        return false;
      }

      return true;
    });
  }, [payments, currentFilters, headerStartDate, headerEndDate, getDateRange]);

  // 🔄 로딩 UI
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // ⚠️ 데이터 없음 UI
  if (!isReady) {
    return (
      <div className="w-full h-full">
        <Typography variant="h2" className="text-gray-600">
          데이터를 불러올 수 없습니다
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      <Container layout="flex-col" className="gap-2">
        <TransactionFilters onFiltersChange={setCurrentFilters} />

        <section className="bg-white rounded-lg shadow p-6">
          {filteredTransactions.length > 0 ? (
            <TransactionTable data={filteredTransactions} title="거래 내역" showPagination={true} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">조건에 맞는 거래가 없습니다</p>
              <p className="text-gray-400 text-sm mt-2">필터 조건을 다시 확인해주세요</p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
