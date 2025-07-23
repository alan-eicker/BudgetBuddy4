import { Link } from 'react-router-dom';

import { ExpenseGroup } from '../../shared/types/expenseGroups';

import styles from './ExpenseGroupGrid.module.scss';

interface ExpenseGroupGridProps {
  expenseGroupData: ExpenseGroup[];
}

const ExpenseGroupGrid = ({ expenseGroupData = [] }: ExpenseGroupGridProps) => {
  return (
    <div className={styles.expenseGroupGrid}>
      {expenseGroupData.map((group) => (
        <Link
          key={group.id}
          className={styles.expenseGroupCard}
          to={`/expense-group/${group.id}`}
        >
          <div>
            <h3 className={styles.groupTitle}>
              {new Date(group.startDate).toDateString()} -{' '}
              {new Date(group.endDate).toDateString()}
            </h3>
            <p className={styles.groupBudget}>
              Total Budget: ${group.totalBudget.toLocaleString()}
            </p>
          </div>
          <img
            width="25"
            height="25"
            src="/images/chevron-right.png"
            alt="chevron-right"
          />
        </Link>
      ))}
    </div>
  );
};

export default ExpenseGroupGrid;
