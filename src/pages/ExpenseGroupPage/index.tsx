import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ExpenseGroupPage = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <>
      <Helmet>
        <title>Budget Buddy | Expense Group</title>
      </Helmet>
      <h1>Expense Group {id}</h1>
      <p>This is the expense group page.</p>
    </>
  );
};

export default ExpenseGroupPage;
