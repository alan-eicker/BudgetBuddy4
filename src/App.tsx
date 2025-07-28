import { Routes, Route, useLocation } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import ExpenseGroupPage from './pages/ExpenseGroupPage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';
import LoginPage from './pages/LoginPage';

import PageLayout from './components/PageLayout';

import useAppProvider from './shared/hooks/useAppProvider';

import { BASE_URL } from './constants/site';

import './styles/app.scss';

function App() {
  const location = useLocation();
  const { loggedIn, loading, error } = useAppProvider();

  const isDashboard = location.pathname === '/dashboard';
  const hasHero = location.pathname === '/' ? false : true;

  return (
    <PageLayout
      heroMinHeight={isDashboard ? 400 : 'auto'}
      hasHero={hasHero}
      loading={loading}
      loggedIn={loggedIn}
      error={error}
    >
      <Routes>
        <Route path={BASE_URL} element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/expense-group/:id" element={<ExpenseGroupPage />} />
        <Route path="/expense-goup/add" element={<ExpenseGroupFormPage />} />
        <Route
          path="/expense-goup/edit/:id"
          element={<ExpenseGroupFormPage />}
        />
      </Routes>
    </PageLayout>
  );
}

export default App;
