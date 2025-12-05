import type { KPIData, Transaction } from '@/types/payment';

/**
 * 거래 데이터에서 통계 계산
 * 컴포넌트에서 직접 호출
 */
export const calculateStatistics = (payments: Transaction[]) => {
  // 금액 합계
  const totalAmount = payments.reduce((sum, p) => {
    const amount = typeof p.amount === 'string' ? parseFloat(p.amount) : p.amount;
    return sum + amount;
  }, 0);

  // 상태별 건수
  const totalCount = payments.length;
  const successCount = payments.filter((p) => p.status === 'SUCCESS').length;
  const failureCount = payments.filter((p) => p.status === 'FAILED').length;
  const pendingCount = payments.filter((p) => p.status === 'PENDING').length;

  // 실패율
  const failureRate = totalCount > 0 ? ((failureCount / totalCount) * 100).toFixed(2) : '0.00';

  return {
    totalAmount,
    totalCount,
    successCount,
    failureCount,
    pendingCount,
    failureRate,
  };
};

/**
 * 통계 데이터를 KPICard 포맷으로 변환
 */
export const transformToKPIData = (payments: Transaction[]): KPIData[] => {
  const stats = calculateStatistics(payments);

  return [
    {
      label: '총 매출',
      value: `₩${(stats.totalAmount / 10000).toFixed(1)}만`,
      subtext: '전체 거래액',
      variant: 'default',
      trend: 'up',
      trendValue: '+12.5%',
    },
    {
      label: '거래 건수',
      value: stats.totalCount,
      subtext: `완료: ${stats.successCount}건`,
      variant: 'success',
      trend: 'up',
      trendValue: `+${stats.successCount}건`,
    },
    {
      label: '진행 중',
      value: stats.pendingCount,
      subtext: `미완료 거래: ${stats.pendingCount} `,
      variant: 'warning',
      trend: 'neutral',
    },
    {
      label: '실패율',
      value: `${stats.failureRate}%`,
      subtext: `${stats.failureCount}건 실패`,
      variant: 'error',
      trend: 'down',
      trendValue: '-2.3%',
    },
  ];
};
