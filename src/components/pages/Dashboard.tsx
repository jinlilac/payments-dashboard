import { useGetMerchantsQuery } from '@/apis/Merchants';
import { useGetPaymentsQuery } from '@/apis/Payments';
import { ChartContainer } from '@/components/atoms/ChartContainer';
import Container from '@/components/atoms/Container';
import { Typography } from '@/components/atoms/Typography';
import AreaChartComponent from '@/components/molecules/AreaChart';
// import BizTypeBarChart from '@/components/molecules/BarChart';
import PieChartComponent from '@/components/molecules/PieChart';
import { KPIGrid } from '@/components/organisms/KPIGrid';
import LoadingSkeleton from '@/components/organisms/Skeleton';
import { TransactionTable } from '@/components/organisms/TransactionTable';
// import { useBusinessTypeRevenue } from '@/hooks/useBizTypeRevenue';
import { useDailyRevenueData } from '@/hooks/useDailyRevenue';
import { useFilteredPayments } from '@/hooks/useFilteredPayments';
import { useTopMerchantsRevenue } from '@/hooks/useTopMerchantsRevenue';
import { normalizedMerchantsAtom } from '@/stores/normalizedMerchantsAtom';
import { paymentsAtom } from '@/stores/paymentAtoms';
import { transformToKPIData } from '@/utils/paymentUtils';
import { useAtomValue } from 'jotai';

export default function DashboardPage() {
  // 데이터 조회
  const { isLoading: paymentsLoading } = useGetPaymentsQuery();
  const { isLoading: merchantsLoading } = useGetMerchantsQuery();
  // 데이터 조회
  // const businessTypeData = useBusinessTypeRevenue();
  const merchantsData = useTopMerchantsRevenue(5);
  const dailyRevenueData = useDailyRevenueData();
  const filteredPayments = useFilteredPayments();

  // 원본 데이터
  const payments = useAtomValue(paymentsAtom);
  const merchants = useAtomValue(normalizedMerchantsAtom);

  //KPI 데이터
  const kpiData = transformToKPIData(filteredPayments);

  const isLoading = paymentsLoading || merchantsLoading;
  const isReady = !isLoading && payments.length > 0 && Object.keys(merchants.name || {}).length > 0;

  if (isLoading) return <LoadingSkeleton />;
  if (!isReady)
    return (
      <div className="w-full h-full">
        <Typography variant="h2" className="text-gray-600">
          데이터를 불러올 수 없습니다
        </Typography>
      </div>
    );

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      {/*KPI 영역 */}
      <Container as="section" layout="flex-col">
        <KPIGrid kpis={kpiData} columns={4} />
      </Container>

      {/* 차트 영역 */}
      <Container as="section" layout="flex-row" className="gap-4 mb-4">
        <ChartContainer title="일일 거래추이" className="w-3/5">
          <AreaChartComponent data={dailyRevenueData} height={400} />
        </ChartContainer>
        <ChartContainer title="거래가 많은 가맹점 Top 5" className="flex-1">
          <PieChartComponent data={merchantsData} />
        </ChartContainer>
        {/* <ChartContainer title="업종별 거래 금액" className="flex-1">
          <BizTypeBarChart data={businessTypeData} height={400} />
        </ChartContainer> */}
      </Container>
      {/* 최건 거래 내역 테이블 */}
      <Container as="section" layout="flex-col">
        {filteredPayments.length > 0 ? (
          <TransactionTable
            data={filteredPayments}
            title="최근 거래 내역"
            limit={5}
            showViewMore={true}
            viewMoreLink="/dashboard/transactions"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">거래 데이터가 없습니다</p>
          </div>
        )}
      </Container>
    </div>
  );
}
