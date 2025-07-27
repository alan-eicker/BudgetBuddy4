import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

import useAppProvider from '../../shared/hooks/useAppProvider';
import Button from '../../components/Button';

import HeaderSection from './components/HeaderSection';

import ExpenseList from '../../features/ExpenseList';

import styles from './ExpenseGroupPage.module.scss';

const ExpenseGroupPage = () => {
  const { id } = useParams<{ id?: string }>();

  const { getExpenseGroupById, getExpensesByGroupId } = useAppProvider();

  const navigate = useNavigate();

  if (!id) return <>No Expense Group ID</>;

  const expenseGroup = getExpenseGroupById(id);
  const expenses = getExpensesByGroupId(id);

  let title = 'Expense Group';

  const portalTarget = document.querySelector('#hero-section');

  const heroContent = portalTarget
    ? createPortal(
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
        />,
        portalTarget,
      )
    : null;

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
      {heroContent}
      <section>
        <div className={styles.expenseListContainer}>
          <div className={styles.expenseListAction}>
            <Button text="+ Add Expense" variant="hollow" onClick={() => {}} />
          </div>
          <ExpenseList
            expenses={expenses}
            onDelete={() => {}}
            onEdit={() => navigate(`/expense-goup/edit/${id}`)}
          />
        </div>
      </section>
    </>
  );
};

export default ExpenseGroupPage;
