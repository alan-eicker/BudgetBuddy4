import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import ExpenseGroupGrid from '../../components/ExpenseGroupGrid';
import Button from '../../components/Button';

import ExpenseSnapshotChart from '../../features/ExpenseSnapshotChart';

import { useAppContext } from '../../shared/providers/AppProvider';

const HomePage = () => {
  const { expenseGroups, allExpenses } = useAppContext();
  const navigate = useNavigate();

  const [heroContent, setHeroContent] = useState<any>();

  const goToAddExpenseGroupPage = () => {
    navigate('/expense-goup/add');
  };

  useEffect(() => {
    const portalTarget = document.querySelector('#hero-section');

    const portalElement = portalTarget ? (
      createPortal(
        <ExpenseSnapshotChart allExpenses={allExpenses} />,
        portalTarget,
      )
    ) : (
      <></>
    );

    setHeroContent(portalElement);
  }, [allExpenses]);

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
