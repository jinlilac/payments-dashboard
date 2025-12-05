import type { ReactNode } from 'react';
import { Sidebar } from '@/components/organisms/SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/organisms/Header';

interface MainLayoutProps {
  children?: ReactNode;
}

const routeTitleMap: Record<string, string> = {
  '/dashboard': '대시보드',
  '/dashboard/transactions': '거래내역',
  '/dashboard/test': '컴포넌트 테스트',
  '/': '대시보드',
};

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  // 현재 경로에 맞는 제목 가져오기
  const currentTitle = routeTitleMap[location.pathname] || '페이지';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={currentTitle} />

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
