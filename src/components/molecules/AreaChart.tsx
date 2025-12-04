import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AreaChartData {
  [key: string]: string | number;
  name: string;
  value: number;
}

interface AreaChartComponentProps {
  data: AreaChartData[];
  height?: number;
  color?: string;
}

export const AreaChartComponent = ({
  data = [],
  height = 300,
  color = '#1E40AF',
}: AreaChartComponentProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-center text-gray-400">
          <p className="text-sm">표시할 데이터가 없습니다</p>
        </div>
      </div>
    );
  }

  const tooltipFormatter = (value: number | string | (string | number)[]): [string, string] => {
    if (typeof value === 'number') {
      return [
        new Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
          minimumFractionDigits: 0,
        }).format(value),
        '금액',
      ];
    }
    return [String(value), ''];
  };

  // Y축 포매터
  const formatYAxis = (value: number): string => {
    if (value >= 10000) {
      return `₩${(value / 10000).toFixed(0)}만`;
    } else if (value >= 1000) {
      return `₩${(value / 1000).toFixed(0)}천`;
    }
    return `₩${value}`;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 16, right: 16, bottom: 24, left: 8 }} responsive>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={true} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={{ stroke: '#ccc' }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={formatYAxis}
          width={50}
          axisLine={{ stroke: '#ccc' }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={tooltipFormatter}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
          cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill="#E5E7EB"
          dot={{
            fill: '#1E40AF',
            r: 3,
          }}
          name="거래 금액"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
