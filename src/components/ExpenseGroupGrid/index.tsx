import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Icon from '../Icon';

import { ExpenseGroup } from '../../shared/types/expenseGroups';

import { toDollarAmountString } from '../../utils/numbers';
import { isOverDue } from '../../utils/dates';

import useAppProvider from '../../shared/hooks/useAppProvider';

import styles from './ExpenseGroupGrid.module.scss';

interface ExpenseGroupGridProps {
  expenseGroupData: ExpenseGroup[];
}

const ExpenseGroupGrid = ({ expenseGroupData = [] }: ExpenseGroupGridProps) => {
  const { allExpenses } = useAppProvider();

  return (
    <div className={styles.expenseGroupGrid}>
      {expenseGroupData.map((group) => {
        const overdueExpenses = allExpenses
          .filter((expense) => expense.expenseGroupId === group.id)
          .map((expense) => isOverDue(expense.dueDate))
          .filter(Boolean);

        const hasOverdueExpenses = overdueExpenses.length > 0;

        return (
          <Link
            key={group.id}
            className={classnames(styles.expenseGroupCard, {
              [styles.hasOverdueExpenses]: hasOverdueExpenses,
            })}
            to={`/expense-group/${group.id}`}
          >
            <div>
              {hasOverdueExpenses && (
                <div className={styles.overDueAlert} role="alert">
                  {overdueExpenses.length} overdue expenses
                </div>
              )}
              <h3 className={styles.groupTitle}>
                {new Date(group.startDate).toDateString()} -{' '}
                {new Date(group.endDate).toDateString()}
              </h3>
              <div className={styles.groupBudget}>
                {}
                Total Budget: {toDollarAmountString(group.totalBudget)}
              </div>
            </div>
            <Icon name="ChevronRight" />
          </Link>
        );
      })}
    </div>
  );
};

export default ExpenseGroupGrid;
