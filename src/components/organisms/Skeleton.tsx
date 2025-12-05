import { Container } from '@/components/atoms/Container';

export const LoadingSkeleton = () => {
  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      <Container layout="flex-col" className="p-6 gap-6">
        {/* KPI 카드 스켈레톤 */}
        <section className="bg-white rounded-lg shadow p-6">
          <Container layout="grid" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-100 rounded w-28 animate-pulse"></div>
              </div>
            ))}
          </Container>
        </section>

        {/* 차트 영역 스켈레톤 */}
        <Container layout="flex-col" className="gap-6">
          {/* 일일 거래 추이 스켈레톤 */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
          </section>

          {/* 차트 2개 스켈레톤 */}
          <Container layout="grid" className="grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <section key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
                <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
              </section>
            ))}
          </Container>
        </Container>

        {/* 테이블 스켈레톤 */}
        <section className="bg-white rounded-lg shadow p-6">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default LoadingSkeleton;
