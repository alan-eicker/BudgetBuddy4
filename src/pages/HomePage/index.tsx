import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import ExpenseGroupGrid from '../../components/ExpenseGroupGrid';
import Button from '../../components/Button';

import ExpenseSnapshotChart from '../../features/ExpenseSnapshotChart';

import { useAppContext } from '../../shared/providers/AppProvider';

const HomePage = () => {
  const { expenseGroups } = useAppContext();
  const navigate = useNavigate();

  const goToAddExpenseGroupPage = () => {
    navigate('/expense-goup/add');
  };

  const portalTarget = document.querySelector('#hero-section');

  const heroContent = portalTarget
    ? createPortal(<ExpenseSnapshotChart />, portalTarget)
    : null;

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
        {heroContent}
        <ExpenseGroupGrid expenseGroupData={expenseGroups} />
      </section>
    </>
  );
};

export default HomePage;
