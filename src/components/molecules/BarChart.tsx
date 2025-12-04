import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const BAR_COLORS = ['#1f77b4', '#2ca02c', '#ff7f0e', '#d62728', '#9467bd', '#17becf'];

interface BizTypeBarData {
  name: string;
  value: number;
}

interface BizTypeBarChartProps {
  data: BizTypeBarData[];
  height?: number;
}

export const BizTypeBarChart = ({ data, height = 260 }: BizTypeBarChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
        <p className="text-sm text-gray-400">표시할 데이터가 없습니다</p>
      </div>
    );
  }

  // 금액 많은 순서로 정렬
  const sorted = [...data].sort((a, b) => b.value - a.value);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(v);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={sorted} margin={{ top: 16, right: 16, bottom: 24, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#ccc' }} />
        <YAxis tickFormatter={formatCurrency} width={90} axisLine={{ stroke: '#ccc' }} />
        <Tooltip
          formatter={(value) => formatCurrency(value as number)}
          labelFormatter={(label) => String(label)}
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {sorted.map((_, index) => (
            <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BizTypeBarChart;
