import type { ReactNode } from 'react';
import { Sidebar } from '@/components/organisms/SideBar';
import { Outlet } from 'react-router-dom';
import cn from '@/libs/cn';

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">올페이즈 관리자</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <p className="font-medium">admin@example.com</p>
            </div>

            <button
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium',
                'bg-gray-100 text-gray-700 hover:bg-gray-200',
                'transition-colors'
              )}
            >
              로그아웃
            </button>
          </div>
        </header>

        {/* 메인 콘텐츠 (스크롤 가능) */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
