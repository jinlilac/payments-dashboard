import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { TransactionRow } from '@/components/molecules/TransactionRow';
import type { Transaction } from '@/types/payment';
import cn from '@/libs/cn';

interface TransactionTableProps {
  data: Transaction[];
}

export const TransactionTable = ({ data }: TransactionTableProps) => {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'paymentCode',
      header: '거래ID',
      size: 120,
    },
    {
      id: 'merchant',
      header: '가맹점',
      size: 140,
    },
    {
      id: 'bizType',
      header: '사업유형',
      size: 90,
    },
    {
      accessorKey: 'amount',
      header: '금액',
      size: 120,
      cell: ({ getValue }) => {
        const amount = getValue() as string | number;
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `₩${numAmount.toLocaleString('ko-KR')}`;
      },
    },
    {
      accessorKey: 'payType',
      header: '결제수단',
      size: 100,
    },
    {
      accessorKey: 'status',
      header: '상태',
      size: 100,
    },
    {
      accessorKey: 'paymentAt',
      header: '거래시간',
      size: 140,
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return date.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  거래 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  )}
                >
                  {/* TransactionRow가 모든 셀 렌더링 */}
                  <TransactionRow transaction={row.original} />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
