import { Routes, Route, useLocation } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import ExpenseGroupPage from './pages/ExpenseGroupPage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';
import LoginPage from './pages/LoginPage';

import PageLayout from './components/PageLayout';

import useAppProvider from './hooks/useAppProvider';

import { useAppContext } from './providers/AppProvider';

import { BASE_URL } from './constants/site';

import './styles/app.scss';

function App() {
  const location = useLocation();
  const { loading, error } = useAppProvider();
  const { staticSiteContent } = useAppContext();

  const isDashboard = location.pathname === '/dashboard';
  const isLoginPage = location.pathname === '/';

  const { nav, baseUrl, copyrightText } = staticSiteContent;

  return (
    <PageLayout
      nav={nav}
      baseUrl={baseUrl}
      copyrightText={copyrightText}
      heroMinHeight={isDashboard ? 400 : 'auto'}
      hasHero={!isLoginPage}
      isLoginPage={isLoginPage}
      loading={loading}
      error={error}
    >
      <Routes>
        <Route path={BASE_URL} element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/expense-group/:id" element={<ExpenseGroupPage />} />
        <Route path="/expense-goup/add" element={<ExpenseGroupFormPage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
