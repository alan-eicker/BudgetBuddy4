import { Link } from 'react-router-dom';

import Icon from '../Icon';

import { ExpenseGroup } from '../../shared/types/expenseGroups';

import { toDollarAmountString } from '../../utils/numbers';

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
            <div className={styles.groupBudget}>
              Total Budget: {toDollarAmountString(group.totalBudget)}
            </div>
          </div>
          <Icon name="ChevronRight" />
        </Link>
      ))}
    </div>
  );
};

export default ExpenseGroupGrid;
