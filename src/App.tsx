import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExpenseGroupFormPage from './pages/ExpenseGroupFormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-expense-goup" element={<ExpenseGroupFormPage />} />
      <Route path="/edit-expense-goup/:id" element={<ExpenseGroupFormPage />} />
    </Routes>
  );
}

export default App;
