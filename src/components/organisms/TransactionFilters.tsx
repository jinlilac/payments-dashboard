import { useState, useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { normalizedMerchantsAtom } from '@/stores/normalizedMerchantsAtom';
import { Container } from '@/components/atoms/Container';
import { Select } from '@/components/atoms/Select';

export interface TransactionFilters {
  merchantId: string | null;
  status: 'ALL' | string;
  payType: 'ALL' | string;
}

interface TransactionFiltersProps {
  onFiltersChange: (filters: TransactionFilters) => void;
}

export const TransactionFilters = ({ onFiltersChange }: TransactionFiltersProps) => {
  const [filters, setFilters] = useState<TransactionFilters>({
    merchantId: null,
    status: 'ALL',
    payType: 'ALL',
  });

  const merchants = useAtomValue(normalizedMerchantsAtom);

  const merchantOptions = Object.entries(merchants.name || {}).map(([id, name]) => ({
    value: id,
    label: name,
  }));

  const payTypeOptions = [
    { value: 'ONLINE', label: '온라인' },
    { value: 'DEVICE', label: '기기결제' },
    { value: 'MOBILE', label: '모바일' },
    { value: 'BILLING', label: '빌링' },
    { value: 'VACT', label: '계좌이체' },
  ];

  const statusOptions = [
    { value: 'SUCCESS', label: '성공' },
    { value: 'FAILED', label: '실패' },
    { value: 'PENDING', label: '진행중' },
  ];

  // 필터 변경 핸들러
  const handleFilterChange = useCallback(
    (newFilters: Partial<Omit<TransactionFilters, 'startDate' | 'endDate'>>) => {
      const updated = { ...filters, ...newFilters };
      setFilters(updated);
      onFiltersChange(updated);
    },
    [filters, onFiltersChange]
  );

  // 초기화
  const handleReset = useCallback(() => {
    const defaultFilters = {
      merchantId: null,
      status: 'ALL',
      payType: 'ALL',
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  }, [onFiltersChange]);

  return (
    <section className="bg-white rounded-lg shadow p-6 ">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">검색 조건</h3>

      <Container layout="flex-col" className="gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Select
              label="결제 상태"
              options={[{ value: 'ALL', label: '전체' }, ...statusOptions]}
              value={filters.status}
              onChange={(e) =>
                handleFilterChange({
                  status: e.target.value as 'ALL' | 'SUCCESS' | 'FAILED' | 'PENDING',
                })
              }
              variant="outlined"
              size="md"
              fullWidth
            />
          </div>

          <div className="flex-1">
            <Select
              label="결제 수단"
              options={[{ value: 'ALL', label: '전체' }, ...payTypeOptions]}
              value={filters.payType}
              onChange={(e) => handleFilterChange({ payType: e.target.value })}
              variant="outlined"
              size="md"
              fullWidth
            />
          </div>

          <div className="flex-1">
            <Select
              label="가맹점"
              options={[{ value: '', label: '전체' }, ...merchantOptions]}
              value={filters.merchantId || ''}
              onChange={(e) => handleFilterChange({ merchantId: e.target.value || null })}
              variant="outlined"
              size="md"
              fullWidth
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition-colors whitespace-nowrap h-[42px]"
            >
              초기화
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TransactionFilters;
