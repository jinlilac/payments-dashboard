import cn from '@/libs/cn';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: '대시보드',
      path: '/dashboard',
      icon: '📊',
      testId: 'menu-dashboard',
    },
    {
      id: 'transactions',
      label: '거래 내역',
      path: '/dashboard/transactions',
      icon: '💳',
      testId: 'menu-transactions',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <>
      <aside
        className={cn(
          'bg-primary-dark border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* 로고 영역 */}
        <div className="px-4 py-6 border-b border-gray-400">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-blue-500  rounded-lg flex items-center justify-center text-white font-bold">
                  OP
                </div>
                <span className="font-bold text-lg text-white">올페이즈</span>
              </Link>
            )}
            {isCollapsed && (
              <Link
                to="/dashboard"
                className="w-full flex justify-center hover:opacity-80 transition-opacity"
                title="올페이즈"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  OP
                </div>
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-400 hover:text-white transition-colors ml-2"
              title={isCollapsed ? '확장' : '축소'}
              aria-label={isCollapsed ? '사이드바 확장' : '사이드바 축소'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
        </div>

        {/* 메뉴 */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto text-white">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                      'hover:bg-gray-50/25',
                      active && 'bg-gray-50/25 text-white font-semibold'
                    )}
                    title={isCollapsed ? item.label : undefined}
                    data-testid={item.testId}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                    {active && !isCollapsed && (
                      <span
                        className="ml-auto flex h-2 w-2 rounded-full bg-gray-50/25"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 사용자 정보 */}
        <div className="px-3 py-4 border-t border-gray-400">
          <button
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg',
              'hover:bg-gray-50/20 transition-colors',
              'text-left'
            )}
            title={isCollapsed ? '프로필' : undefined}
            aria-label="사용자 프로필"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              A
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin</p>
                <p className="text-xs text-gray-300 truncate">관리자</p>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
