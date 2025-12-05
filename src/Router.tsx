import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/components/templates/MainLayout';
import ComponentTest from '@/components/templates/ComponentTest';
import DashboardPage from '@/components/pages/Dashboard';
import TransactionsPage from '@/components/pages/Transactions';

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  { path: '/', element: <p>아무거나</p> },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
      { path: 'test', element: <ComponentTest /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
