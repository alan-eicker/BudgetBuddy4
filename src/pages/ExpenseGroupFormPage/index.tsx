import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { createPortal } from 'react-dom';

import ExpenseGroupForm from '../../features/ExpenseGroupForm';

const ExpenseGroupFormPage = () => {
  const { id } = useParams<{ id?: string }>();

  const portalTarget = document.querySelector('#hero-section');

  const heroContent = portalTarget
    ? createPortal(<h1>{id ? 'Edit' : 'Add'} Expense Group</h1>, portalTarget)
    : null;

  return (
    <>
      <Helmet>
        <title>
          Budget Buddy | {id ? 'Edit Expense Group' : 'Add Expense Group'}
        </title>
      </Helmet>
      {heroContent}
      <ExpenseGroupForm expenseGroupId={id} />
    </>
  );
};

export default ExpenseGroupFormPage;
