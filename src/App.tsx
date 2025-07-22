import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ExpenseGroupPage from './pages/ExpenseGroupPage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';

import PageLayout from './components/PageLayout';
import ExpenseSnapshotChart from './features/ExpenseSnapshotChart';

import { BASE_URL } from './constants/site';

import './styles/app.scss';

function App() {
  const location = useLocation();

  return (
    <PageLayout
      heroContent={<ExpenseSnapshotChart />}
      hasHero={location.pathname === BASE_URL}
    >
      <Routes>
        <Route path={BASE_URL} element={<HomePage />} />
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
