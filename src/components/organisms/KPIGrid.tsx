import { KPICard } from '@/components/molecules/KPICard';
import type { KPIData } from '@/types/payment';

type KPIGridProps = {
  kpis: KPIData[];
  columns?: 2 | 3 | 4;
};

export const KPIGrid = ({ kpis, columns = 4 }: KPIGridProps) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 mb-8`}>
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};
