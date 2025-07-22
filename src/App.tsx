import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ExpenseGroupPage from './pages/ExpenseGroupPage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';

import PageLayout from './components/PageLayout';
import ExpenseSnapshotChart from './features/ExpenseSnapshotChart';

import useAppProvider from './shared/hooks/useAppProvider';

import './styles/app.scss';

const categories = [
  'All',
  'Housing',
  'Utilities',
  'Medical',
  'Groceries',
  'Entertainment',
  'Investing',
  'Misc',
];

function App() {
  const location = useLocation();

  return (
    <PageLayout
      heroContent={<ExpenseSnapshotChart />}
      hasHero={location.pathname === '/'}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
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
