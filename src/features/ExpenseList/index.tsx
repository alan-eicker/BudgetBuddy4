import { useState } from 'react';
import { Expense } from '../../shared/types/expenseGroups';

import Button from '../../components/Button';
import Switch from '../../components/Switch';
import ConfirmationSlider from '../../components/ConfirmationSlider';

import { toDollarAmountString } from '../../utils/numbers';

import styles from './ExpenseList.module.scss';

export interface ExpenseListProps {
  expenses?: Expense[];
  onDelete: () => void;
  onEdit: () => void;
}

const ExpenseList = ({ onDelete, onEdit, expenses = [] }: ExpenseListProps) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>();

  const handleConfirmClick = () => {
    setActiveSliderIndex(undefined);
    onDelete();
  };

  return expenses.length > 0 ? (
    <div className={styles.expenseList}>
      {expenses.map((expense, index) => (
        <div key={expense.id} className={styles.expenseListItem}>
          <div>
            <h3 className={styles.expenseListItemTitle}>{expense.name}</h3>
            <b>Balance Due:</b> {toDollarAmountString(expense.balance)}
          </div>
          <div className={styles.expenseListItemActions}>
            <div className={styles.expenseListItemStatusSwitch}>
              <label>Is Paid</label>
              <Switch checked={expense.paid} onChange={() => {}} />
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
      ))}
    </div>
  ) : (
    <>No expenses to list for this group.</>
  );
};

export default ExpenseList;
