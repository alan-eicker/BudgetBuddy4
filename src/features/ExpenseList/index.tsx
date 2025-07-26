import { useState } from 'react';
import { Expense } from '../../shared/types/expenseGroups';

import Button from '../../components/Button';
import Switch from '../../components/Switch';
import ConfirmationSlider from '../../components/ConfirmationSlider';

import styles from './ExpenseList.module.scss';

export interface ExpenseListProps {
  expenses?: Expense[];
}

const ExpenseList = ({ expenses = [] }: ExpenseListProps) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>();

  return expenses.length > 0 ? (
    <div className={styles.expenseList}>
      {expenses.map((expense, index) => (
        <div key={expense.id} className={styles.expenseListItem}>
          <div>
            <h3 className={styles.expenseListItemTitle}>{expense.name}</h3>
            <b>Balance Due:</b> ${expense.balance}
          </div>
          <div className={styles.expenseListItemTitleActions}>
            <div className={styles.expenseListItemStatusSwitch}>
              <label>Is Paid</label>
              <Switch checked={expense.paid} onChange={() => {}} />
            </div>
            <Button text="Edit" variant="secondary" size="sm" />
            <Button
              text="Delete"
              variant="delete"
              size="sm"
              onClick={() => setActiveSliderIndex(index)}
            />
          </div>
          <ConfirmationSlider
            onConfirm={() => {}}
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
