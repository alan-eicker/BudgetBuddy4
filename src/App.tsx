import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';

import PageLayout from './components/PageLayout';
import BarChart from './components/BarChart';

import './styles/app.scss';

const data = [
  {
    name: 'Jan',
    uv: 9000,
    pv: 1000,
    amt: 10000,
  },
  {
    name: 'Feb',
    uv: 9000,
    pv: 2000,
    amt: 11000,
  },
  {
    name: 'Mar',
    uv: 7700,
    pv: 0,
    amt: 7700,
  },
  {
    name: 'Apr',
    uv: 9000,
    pv: 4500,
    amt: 13500,
  },
  {
    name: 'May',
    uv: 5500,
    pv: 0,
    amt: 5500,
  },
  {
    name: 'June',
    uv: 6760,
    pv: 0,
    amt: 6760,
  },
  {
    name: 'July',
    uv: 9000,
    pv: 1500,
    amt: 10500,
  },
  {
    name: 'Aug',
    uv: 9000,
    pv: 0,
    amt: 9000,
  },
  {
    name: 'Sept',
    uv: 9000,
    pv: 500,
    amt: 9500,
  },
];

function App() {
  const location = useLocation();

  return (
    <PageLayout
      heroContent={<BarChart data={data} />}
      hasHero={location.pathname === '/'}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
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
