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
import { useMemo } from 'react';
import { Button } from '@/components/atoms/Button';

interface TransactionTableProps {
  data: Transaction[];

  title?: string;
  showViewMore?: boolean;
  viewMoreLink?: string;

  // 페이지네이션 옵션
  showPagination?: boolean;
  limit?: number;
}

export const TransactionTable = ({
  data,
  title,
  showViewMore = false,
  viewMoreLink = '/dashboard/transactions',
  showPagination = false,
  limit,
}: TransactionTableProps) => {
  // 페이지네이션 사용 여부에 따라 displayData 결정
  const displayData = useMemo(() => {
    if (showPagination) {
      return data;
    }
    if (limit) {
      return data.slice(0, limit);
    }
    return data;
  }, [data, showPagination, limit]);

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
    data: displayData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {showViewMore && (
            <a
              href={viewMoreLink}
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              전체 보기 →
            </a>
          )}
        </div>
      )}

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
      {/* 페이지네이션 (showPagination true일 때만) */}
      {showPagination && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()} 페이지
            <span className="ml-2 text-gray-500">(전체 {data.length}건)</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              variant="outline"
              size="sm"
              className="min-w-[60px]"
            >
              처음
            </Button>

            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant="outline"
              size="sm"
              className="min-w-[60px]"
            >
              이전
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
                .slice(
                  Math.max(0, table.getState().pagination.pageIndex - 2),
                  Math.min(table.getPageCount(), table.getState().pagination.pageIndex + 3)
                )
                .map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => table.setPageIndex(pageNum - 1)}
                    className={cn(
                      'w-8 h-8 rounded text-sm font-medium transition-colors',
                      pageNum === table.getState().pagination.pageIndex + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {pageNum}
                  </button>
                ))}
            </div>

            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="outline"
              size="sm"
              className="min-w-[60px]"
            >
              다음
            </Button>

            <Button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              variant="outline"
              size="sm"
              className="min-w-[60px]"
            >
              마지막
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">페이지당:</label>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
