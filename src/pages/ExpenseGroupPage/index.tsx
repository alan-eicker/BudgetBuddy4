import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import useAppProvider from '../../shared/hooks/useAppProvider';
import Button from '../../components/Button';

import HeaderSection from './components/HeaderSection';

import ExpenseList from '../../features/ExpenseList';

const ExpenseGroupPage = () => {
  const { id } = useParams<{ id?: string }>();

  const { getExpenseGroupById, getExpensesByGroupId } = useAppProvider();

  if (!id) return <>No Expense Group ID</>;

  const expenseGroup = getExpenseGroupById(id);
  const expenses = getExpensesByGroupId(id);

  let title = 'Expense Group';

  if (expenseGroup?.startDate && expenseGroup?.endDate) {
    title = `${new Date(expenseGroup?.startDate).toDateString()} - ${new Date(
      expenseGroup?.endDate,
    ).toDateString()}`;
  }

  return (
    <>
      <Helmet>
        <title>Budget Buddy | Expense Group</title>
      </Helmet>
      <HeaderSection
        title={title}
        subtitle={`Total Budget: $${(
          expenseGroup?.totalBudget || 0
        ).toLocaleString()}`}
        buttons={[
          <Button text="Edit" variant="secondary" onClick={() => {}} />,
          <Button text="Duplicate" variant="secondary" onClick={() => {}} />,
          <Button text="Delete" variant="tertiary" onClick={() => {}} />,
        ]}
      />
      <section>
        <ExpenseList expenses={expenses} />
      </section>
    </>
  );
};

export default ExpenseGroupPage;
