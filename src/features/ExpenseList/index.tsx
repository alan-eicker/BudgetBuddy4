import { useState } from 'react';
import classnames from 'classnames';

import { Expense } from '../../shared/types/expenseGroups';

import Button from '../../components/Button';
import Switch from '../../components/Switch';
import ConfirmationSlider from '../../components/ConfirmationSlider';
import Icon from '../../components/Icon';

import { toDollarAmountString } from '../../utils/numbers';
import { formatDate, isOverDue } from '../../utils/dates';

import styles from './ExpenseList.module.scss';

export interface ExpenseListProps {
  expenses?: Expense[];
  onUpdateStatus: (expenseId: string, padi: boolean) => void;
  onDelete: () => void;
  onEdit: () => void;
}

const ExpenseList = ({
  onDelete,
  onEdit,
  onUpdateStatus,
  expenses = [],
}: ExpenseListProps) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>();

  const handleConfirmClick = () => {
    setActiveSliderIndex(undefined);
    onDelete();
  };

  return expenses.length > 0 ? (
    <div className={styles.expenseList}>
      {expenses.map((expense, index) => {
        const isOverdue = !expense.paid && isOverDue(expense.dueDate);
        return (
          <div
            key={expense.id}
            className={classnames(styles.expenseListItem, {
              [styles.isOverdue]: isOverdue,
            })}
          >
            <div className={styles.expenseListItemDetails}>
              <div className={styles.expenseListItemIcon}>
                <Icon name={expense.type} />
                {JSON.stringify(isOverDue)}
              </div>
              <div className={styles.expenseListItemInfo}>
                <div className={styles.expenseListItemType}>{expense.type}</div>
                <h3 className={styles.expenseListItemTitle}>{expense.name}</h3>
                <b>Balance Due:</b> {toDollarAmountString(expense.balance)}{' '}
                {expense.dueDate && (
                  <>
                    | <b>Due:</b>{' '}
                    <span className={styles.dueDate}>
                      {formatDate(expense.dueDate)}{' '}
                      {isOverdue && <Icon name="error" />}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className={styles.expenseListItemActions}>
              <div className={styles.expenseListItemStatusSwitch}>
                <label>Is Paid</label>
                <Switch
                  checked={expense.paid}
                  onChange={(e) => onUpdateStatus(expense.id, e.target.checked)}
                />
              </div>
              <Button
                text="Edit"
                variant="secondary"
                size="sm"
                onClick={onEdit}
              />
              <Button
                text="Delete"
                variant="delete"
                size="sm"
                onClick={() => setActiveSliderIndex(index)}
              />
            </div>
            <ConfirmationSlider
              onConfirm={handleConfirmClick}
              onCancel={() => setActiveSliderIndex(undefined)}
              isActive={index === activeSliderIndex}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <div>No expenses to list for this group.</div>
  );
};

export default ExpenseList;
