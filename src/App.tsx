import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';

import PageLayout from './components/PageLayout';

import './styles/app.scss';

function App() {
  return (
    <PageLayout>
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
