import { Routes, Route, useLocation } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import ExpenseGroupPage from './pages/ExpenseGroupPage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';

import PageLayout from './components/PageLayout';

import useAppProvider from './shared/hooks/useAppProvider';

import './styles/app.scss';

function App() {
  const location = useLocation();
  const { loading, error } = useAppProvider();

  const isDashboard = location.pathname === '/dashboard';

  return (
    <PageLayout
      heroMinHeight={isDashboard ? 400 : 'auto'}
      loading={loading}
      error={error}
    >
      <Routes>
        {/* <Route path={BASE_URL} element={<HomePage />} /> */}
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
