import { Helmet } from 'react-helmet-async';
import { createPortal } from 'react-dom';

import ExpenseGroupForm from '../../features/ExpenseGroupForm';

const ExpenseGroupFormPage = () => {
  const portalTarget = document.querySelector('#hero-section');

  const heroContent = portalTarget
    ? createPortal(<h1>Budget Buddy</h1>, portalTarget)
    : null;

  return (
    <>
      <Helmet>
        <title>Add Expense Group | Add Expense Group</title>
      </Helmet>
      {heroContent}
      <ExpenseGroupForm />
    </>
  );
};

export default ExpenseGroupFormPage;
