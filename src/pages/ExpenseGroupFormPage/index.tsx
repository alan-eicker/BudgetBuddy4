import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ExpenseGroupFormPage = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <>
      <Helmet>
        <title>
          Budget Buddy | {id ? 'Edit Expense Group' : 'Add Expense Group'}
        </title>
      </Helmet>
      <h1>{id ? 'Edit' : 'Add'} Expense Group Form Page</h1>
      <p>This is the expense group form page.</p>
    </>
  );
};

export default ExpenseGroupFormPage;
