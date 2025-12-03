import { Typography } from '@/components/atoms/Typography';

type NavItem = {
  label: string;
  icon: string;
  href: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: '대시보드', icon: '📊', href: '/', active: true },
  { label: '거래 내역', icon: '📋', href: '/transactions' },
  { label: '분석', icon: '📈', href: '/analysis' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-primary-dark border-r border-gray-200 p-6 flex flex-col">
      <div className="mb-8">
        <Typography variant="h2" className="text-2xl font-bold text-white">
          💳 올페이즈
        </Typography>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`inline-block w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
              item.active ? 'bg-blue-100/25 text-white ' : 'text-white hover:bg-blue-100/25'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="border-t border-gray-200 pt-4">
        <Typography variant="body-sm" color="secondary">
          © 2025 Payment Dashboard
        </Typography>
      </div>
    </aside>
  );
};
