import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ExpenseGroupPage from './pages/ExpenseGroupPage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';

import PageLayout from './components/PageLayout';
import ExpenseSnapshotChart from './components/ExpenseSnapshotChart';

import './styles/app.scss';

const chartData = [
  {
    name: 'Jan',
    budgetTotal: 9000,
    overageTotal: 1000,
    totalBalance: 10000,
    type: 'housing',
  },
  {
    name: 'Feb',
    budgetTotal: 9000,
    overageTotal: 2000,
    totalBalance: 11000,
    type: 'utilities',
  },
  {
    name: 'Mar',
    budgetTotal: 7700,
    overageTotal: 0,
    totalBalance: 7700,
    type: 'utilities',
  },
  {
    name: 'Apr',
    budgetTotal: 9000,
    overageTotal: 4500,
    totalBalance: 13500,
    type: 'medical',
  },
  {
    name: 'May',
    budgetTotal: 5500,
    overageTotal: 0,
    totalBalance: 5500,
    type: 'groceries',
  },
  {
    name: 'June',
    budgetTotal: 6760,
    overageTotal: 0,
    totalBalance: 6760,
    type: 'entertainment',
  },
  {
    name: 'July',
    budgetTotal: 9000,
    overageTotal: 1500,
    totalBalance: 10500,
    type: 'utilities',
  },
  {
    name: 'Aug',
    budgetTotal: 9000,
    overageTotal: 0,
    totalBalance: 9000,
    type: 'investing',
  },
  {
    name: 'Sept',
    budgetTotal: 9000,
    overageTotal: 500,
    totalBalance: 9500,
    type: 'investing',
  },
];

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
      heroContent={
        <ExpenseSnapshotChart
          chartData={chartData}
          title="Total Expenses Over 12 Months"
          categories={categories}
          onCategoryChange={(category) => console.log(category)}
        />
      }
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
