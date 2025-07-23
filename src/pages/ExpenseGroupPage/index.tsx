import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import useAppProvider from '../../shared/hooks/useAppProvider';
import ExpenseGroupPageLoader from '../../components/Loaders/ExpenseGroupPageLoader';

const ExpenseGroupPage = () => {
  const { id } = useParams<{ id?: string }>();

  const { getExpenseGroupById, /** getExpensesByGroupId, */ loading } =
    useAppProvider();

  if (!id) return <>No Expense Group ID</>;

  if (loading) {
    return <ExpenseGroupPageLoader />;
  }

  const expenseGroup = getExpenseGroupById(id);
  // const expenses = getExpensesByGroupId(id);

  let title = 'Expense Group';

  if (expenseGroup?.startDate && expenseGroup?.endDate) {
    title = `${new Date(expenseGroup?.startDate).toDateString()} - ${new Date(
      expenseGroup?.startDate,
    ).toDateString()}`;
  }

  return (
    <>
      <Helmet>
        <title>Budget Buddy | Expense Group</title>
      </Helmet>
      <h1>{title}</h1>
      <h2>
        Total Budget: ${(expenseGroup?.totalBudget || 0).toLocaleString()}
      </h2>
    </>
  );
};

export default ExpenseGroupPage;
