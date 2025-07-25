import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import ExpenseGroupGrid from '../../components/ExpenseGroupGrid';
import Button from '../../components/Button';

import { useAppContext } from '../../shared/providers/AppProvider';

const HomePage = () => {
  const { expenseGroups } = useAppContext();
  const navigate = useNavigate();

  const goToAddExpenseGroupPage = () => {
    navigate('/expense-goup/add');
  };

  return (
    <>
      <Helmet>
        <title>Budget Buddy | Dashboard</title>
      </Helmet>
      <Button
        text="Add Expense Group"
        variant="secondary"
        onClick={goToAddExpenseGroupPage}
      />
      <section>
        <ExpenseGroupGrid expenseGroupData={expenseGroups} />
      </section>
    </>
  );
};

export default HomePage;
