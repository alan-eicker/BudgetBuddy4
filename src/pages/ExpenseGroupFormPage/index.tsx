import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ExpenseGroupForm from '../../features/ExpenseGroupForm';

const ExpenseGroupFormPage = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <>
      <Helmet>
        <title>
          Budget Buddy | {id ? 'Edit Expense Group' : 'Add Expense Group'}
        </title>
      </Helmet>
      <h1>{id ? 'Edit' : 'Add'} Expense Group</h1>
      <section>
        <ExpenseGroupForm expenseGroupId={id} />
      </section>
    </>
  );
};

export default ExpenseGroupFormPage;
