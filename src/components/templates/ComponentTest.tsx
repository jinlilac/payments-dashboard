import { useGetMerchantsQuery } from '@/apis/Merchants';
import { useGetPaymentsQuery } from '@/apis/Payments';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { ChartContainer } from '@/components/atoms/ChartContainer';
import Container from '@/components/atoms/Container';
import { Typography } from '@/components/atoms/Typography';
import BizTypeBarChart from '@/components/molecules/BarChart';
import { KPICard } from '@/components/molecules/KPICard';
import LineChartComponent from '@/components/molecules/AreaChart';
import PieChartComponent from '@/components/molecules/PieChart';
import { KPIGrid } from '@/components/organisms/KPIGrid';
import { TransactionTable } from '@/components/organisms/TransactionTable';
import { DateRangeCalendar } from '@/components/templates/DateRangeCalendar';
import { useBusinessTypeRevenue } from '@/hooks/useBizTypeRevenue';
import { useDailyRevenueData } from '@/hooks/useDailyRevenue';
// import { useFilteredMerchants } from '@/hooks/useFilteredMerchants';
import { useFilteredPayments } from '@/hooks/useFilteredPayments';
import { useTopMerchantsRevenue } from '@/hooks/useTopMerchantsRevenue';
// import { merchantsAtom } from '@/stores/merchantAtoms';
import { paymentsAtom } from '@/stores/paymentAtoms';
import { transformToKPIData } from '@/utils/paymentUtils';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

export default function ComponentTest() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { isLoading } = useGetPaymentsQuery();
  const { isLoading: loading } = useGetMerchantsQuery();

  const payments = useAtomValue(paymentsAtom);
  // const merchants = useAtomValue(merchantsAtom);
  const kpiData = transformToKPIData(payments);
  const filteredPayments = useFilteredPayments();
  // const filteredMerchants = useFilteredMerchants();

  const bisTypeData = useBusinessTypeRevenue();
  const merchantData = useTopMerchantsRevenue(5);
  const dailyRevenueData = useDailyRevenueData();

  // console.log('merchants', merchants);

  console.log('filteredPayments', filteredPayments);
  // console.log('filteredMerchants', filteredMerchants);

  const filteredData = selectedStatus
    ? payments.filter((t) => t.status === selectedStatus)
    : payments;
  if (isLoading && loading) return <div>로딩중..</div>;
  return (
    <div className="flex gap-6">
      {/* <Sidebar /> */}
      <div>
        <Typography variant="h1" className="mb-12">
          🧪 Atom 컴포넌트 테스트
        </Typography>
        <DateRangeCalendar />
        <Card>
          <ChartContainer title="일일 거래추이">
            <LineChartComponent data={dailyRevenueData} />
          </ChartContainer>
          <ChartContainer title="업종별 거래 금액">
            {/* <PieChartComponent data={merchantData} /> */}
            <BizTypeBarChart data={bisTypeData} />
          </ChartContainer>
          <ChartContainer title="거래가 많은 가맹점 Top 5">
            <PieChartComponent data={merchantData} />
          </ChartContainer>
        </Card>
        {/* Button 테스트 */}
        <Card className="mb-8">
          <Container layout="flex-col" className="gap-6">
            <Typography variant="h2">Button 컴포넌트</Typography>
            {/* Primary */}
            <div>
              <Typography variant="h3" className="mb-3">
                Primary Variant
              </Typography>
              <Container layout="flex-row" className="gap-3 flex-wrap">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </Container>
            </div>

            {/* Secondary */}
            <div>
              <Typography variant="h3" className="mb-3">
                Secondary Variant
              </Typography>
              <Container layout="flex-row" className="gap-3 flex-wrap">
                <Button variant="secondary" size="sm">
                  Small
                </Button>
                <Button variant="secondary" size="md">
                  Medium
                </Button>
                <Button variant="secondary" size="lg">
                  Large
                </Button>
              </Container>
            </div>

            {/* Outline */}
            <div>
              <Typography variant="h3" className="mb-3">
                Outline Variant
              </Typography>
              <Container layout="flex-row" className="gap-3 flex-wrap">
                <Button variant="outline" size="sm">
                  Small
                </Button>
                <Button variant="outline" size="md">
                  Medium
                </Button>
                <Button variant="outline" size="lg">
                  Large
                </Button>
              </Container>
            </div>

            {/* With aria-label */}
            <div>
              <Typography variant="h3" className="mb-3">
                접근성 속성
              </Typography>
              <Container layout="flex-row" className="gap-3">
                <Button ariaLabel="저장 버튼">Save</Button>
                <Button ariaLabel="삭제 버튼">Delete</Button>
              </Container>
            </div>
          </Container>
        </Card>

        {/* KPICard 테스트 */}
        <Card className="mb-8">
          <Container layout="flex-col" className="gap-6">
            <KPICard label="KPI 카드 테스트" value={12450000} subtext="15.3%" />
          </Container>
        </Card>

        {/* Badge 테스트 */}
        <Card className="mb-8">
          <Container layout="flex-col" className="gap-6">
            <div>
              <Typography variant="h3" className="mb-3">
                Status Badges
              </Typography>
              <Container layout="flex-row" className="gap-3 flex-wrap">
                <Badge status="success">✓ 완료</Badge>
                <Badge status="error">✗ 실패</Badge>
                <Badge status="warning">⚠ 경고</Badge>
                <Badge status="info">ℹ 정보</Badge>
              </Container>
            </div>

            <div>
              <Typography variant="h3" className="mb-3">
                Custom Badges
              </Typography>
              <Container layout="flex-row" className="gap-3 flex-wrap">
                <Badge status="success">SUCCESS</Badge>
                <Badge status="error">FAILED</Badge>
                <Badge status="warning">PENDING</Badge>
                <Badge status="info">CANCELLED</Badge>
              </Container>
            </div>
          </Container>
        </Card>

        {/* TransactionTable 테스트 */}
        <Card className="mb-8">
          <Container layout="flex-col" className="gap-6">
            <div>
              <Typography variant="h2">📊 TransactionTable 컴포넌트</Typography>
              <Typography variant="body" className="text-gray-600 mt-2">
                실제 거래 데이터를 테이블로 표시합니다. 정렬, 페이지네이션, 필터링 지원
              </Typography>
            </div>

            {/* 상태별 필터 버튼 */}
            <div>
              <Typography variant="h3" className="mb-3">
                상태별 필터
              </Typography>
              <Container layout="flex-row" className="gap-2 flex-wrap">
                <Button
                  variant={selectedStatus === null ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(null)}
                >
                  전체 ({filteredData.length}건)
                </Button>
                <Button
                  variant={selectedStatus === 'SUCCESS' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus('SUCCESS')}
                >
                  ✅ 완료 ({filteredData.filter((t) => t.status === 'SUCCESS').length}건)
                </Button>
                <Button
                  variant={selectedStatus === 'FAILED' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus('FAILED')}
                >
                  ❌ 실패 ({filteredData.filter((t) => t.status === 'FAILED').length}건)
                </Button>
                <Button
                  variant={selectedStatus === 'CANCELLED' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus('CANCELLED')}
                >
                  ⚠️ 취소 ({filteredData.filter((t) => t.status === 'CANCELLED').length}건)
                </Button>
              </Container>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <Typography variant="caption" className="text-gray-600">
                  현재 표시
                </Typography>
                <Typography variant="h3" className="text-blue-600 mt-2">
                  {filteredData.length}건
                </Typography>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <Typography variant="caption" className="text-gray-600">
                  완료
                </Typography>
                <Typography variant="h3" className="text-green-600 mt-2">
                  {filteredData.filter((t) => t.status === 'SUCCESS').length}건
                </Typography>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <Typography variant="caption" className="text-gray-600">
                  실패
                </Typography>
                <Typography variant="h3" className="text-red-600 mt-2">
                  {filteredData.filter((t) => t.status === 'FAILED').length}건
                </Typography>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <Typography variant="caption" className="text-gray-600">
                  취소
                </Typography>
                <Typography variant="h3" className="text-amber-600 mt-2">
                  {filteredData.filter((t) => t.status === 'CANCELLED').length}건
                </Typography>
              </div>
            </div>

            {/* 테이블 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <TransactionTable data={filteredData} />
            </div>

            {/* 설명 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Typography variant="body" className="text-blue-900">
                💡 <strong>기능:</strong> 컬럼 헤더를 클릭하면 정렬됩니다. 페이지네이션 버튼으로
                페이지를 이동할 수 있습니다. 상태별 필터 버튼으로 거래를 필터링할 수 있습니다.
              </Typography>
            </div>
          </Container>
        </Card>
        <Card>
          <KPIGrid kpis={kpiData} columns={4} />
        </Card>
      </div>
    </div>
  );
}
