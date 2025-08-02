import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

import useAppProvider from '../../shared/hooks/useAppProvider';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

import HeaderSection from './components/HeaderSection';

import ExpenseList from '../../features/ExpenseList';
import SpendingSnapshot from '../../features/SpendingSnapshot';

import { toDollarAmountString } from '../../utils/numbers';

import styles from './ExpenseGroupPage.module.scss';

const ExpenseGroupPage = () => {
  const { id } = useParams<{ id?: string }>();

  const { getExpenseGroupById, getExpensesByGroupId, updateExpenseStatus } =
    useAppProvider();

  if (!id) return <>No Expense Group ID</>;

  const expenseGroup = getExpenseGroupById(id);
  const expenses = getExpensesByGroupId(id);

  let title = 'Expense Group';

  if (expenseGroup?.startDate && expenseGroup?.endDate) {
    title = `${new Date(expenseGroup?.startDate).toDateString()} - ${new Date(
      expenseGroup?.endDate,
    ).toDateString()}`;
  }

  const portalTarget = document.querySelector('#hero-section');

  const totalBudgetStr = `Total Budget: ${toDollarAmountString(
    expenseGroup?.totalBudget || 0,
  )}`;

  const heroContent = portalTarget
    ? createPortal(
        <HeaderSection
          title={title}
          subtitle={totalBudgetStr}
          buttons={[
            <Button
              key="Edit"
              text="Edit"
              variant="secondary"
              onClick={() => {}}
            />,
            <Button
              key="Duplicate"
              text="Duplicate"
              variant="secondary"
              onClick={() => {}}
            />,
            <Button
              key="Delete"
              text="Delete"
              variant="tertiary"
              onClick={() => {}}
            />,
          ]}
        />,
        portalTarget,
      )
    : null;

  return (
    <>
      <Helmet>
        <title>Budget Buddy | Expense Group</title>
      </Helmet>
      {heroContent}
      <div className={styles.expenseGroupPageContainer}>
        <div className={styles.actionButtons}>
          <Link to="/dashboard" className={styles.backButton}>
            <Icon name="back" />
            <span>Back to Dashboard</span>
          </Link>
          <Button
            text="+ Add Expense"
            size="sm"
            variant="secondary"
            onClick={() => {}}
          />
        </div>
        <div className={styles.expenseGroupPageContent}>
          <ExpenseList
            expenses={expenses}
            onUpdateStatus={updateExpenseStatus}
            onDelete={() => {}}
            onEdit={() => {}}
          />
          <aside className={styles.sidebar}>
            <SpendingSnapshot
              expenses={expenses}
              totalBudget={expenseGroup?.totalBudget}
            />
          </aside>
        </div>
      </div>
    </>
  );
};

export default ExpenseGroupPage;
