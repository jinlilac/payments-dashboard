import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from 'recharts';

const DISTINCT_COLORS = [
  '#2563EB',
  '#10B981',
  '#ff7f0e',
  '#EF4444',
  '#e377c2',
  '#9467bd',
  '#17becf',
  '#bcbd22',
];

interface PieChartData {
  [key: string]: string | number;
  name: string;
  value: number;
}

interface PieChartComponentProps {
  data: PieChartData[];
  colors?: string[];
  height?: number;
}

export const PieChartComponent = ({
  data = [],
  colors = DISTINCT_COLORS,
  height = 400,
}: PieChartComponentProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-center text-gray-400">
          <p className="text-sm">표시할 데이터가 없습니다</p>
        </div>
      </div>
    );
  }

  const renderLabel = (props: PieLabelRenderProps) => {
    const { name, percent } = props;

    const displayName = String(name || '기타');
    const percentage = ((percent ?? 0) * 100).toFixed(0);
    return `${displayName} ${percentage}%`;
  };

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

  const legendFormatter = (value: string): string => {
    return value;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart margin={{ top: 20, right: 80, bottom: 20, left: 20 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          innerRadius={45}
          outerRadius={100}
          dataKey="value"
          animationBegin={0}
          animationDuration={400}
          animationEasing="ease-out"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

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

        <Legend
          layout="vertical"
          align="left"
          verticalAlign="bottom"
          wrapperStyle={{
            fontSize: '12px',
          }}
          formatter={legendFormatter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
