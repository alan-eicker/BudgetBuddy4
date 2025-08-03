import { useState } from 'react';
import classnames from 'classnames';

import { Expense } from '../../types/expenseGroups';
import { ExpenseFormValues, ExpenseFormType } from '../ExpenseForm';

import Button from '../../components/Button';
import Switch from '../../components/Switch';
import ConfirmationSlider from '../../components/ConfirmationSlider';
import Icon from '../../components/Icon';
import Notification, { NotificationProps } from '../../components/Notification';

import ExpenseForm from '../ExpenseForm';

import { toDollarAmountString } from '../../utils/numbers';
import { formatDate, isOverDue } from '../../utils/dates';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import styles from './ExpenseList.module.scss';

export interface ExpenseListProps {
  expenses?: Expense[];
  onUpdateStatus: (expenseId: string, padi: boolean) => void;
  onEditExpense: (values: ExpenseFormValues, type: ExpenseFormType) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseList = ({
  onEditExpense,
  onUpdateStatus,
  expenses = [],
}: ExpenseListProps) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>();
  const [selectedExpense, setSelectedExpense] = useState<string>();
  const [notification, setNotification] = useState<NotificationProps>();

  const handleConfirmClick = async (expenseId: string): Promise<void> => {
    setActiveSliderIndex(undefined);
    try {
      const docRef = doc(db, 'Expense', expenseId);
      await deleteDoc(docRef);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Error: could not delete document',
      });
    }
  };

  const toggleExpenseForm = (id: string): void => {
    setSelectedExpense(!selectedExpense ? id : undefined);
  };

  const handleSubmit = (values: ExpenseFormValues, type: ExpenseFormType) => {
    onEditExpense(values, type);
    setSelectedExpense(undefined);
  };

  return expenses.length > 0 ? (
    <div className={styles.expenseList}>
      {notification && <Notification {...notification} />}
      {expenses.map((expense, index) => {
        const isOverdue = !expense.paid && isOverDue(expense.dueDate);
        return (
          <div
            key={expense.id}
            className={classnames(styles.expenseListItem, {
              [styles.isOverdue]: isOverdue,
            })}
          >
            <div className={styles.expenseListItemDetailsContainer}>
              <div className={styles.expenseListItemDetails}>
                <Icon name={expense.type} size="35px" />
                <div className={styles.expenseListItemInfo}>
                  <div className={styles.expenseListItemType}>
                    {expense.type}
                  </div>
                  <h3 className={styles.expenseListItemTitle}>
                    {expense.name}
                  </h3>
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
                    onChange={(e) =>
                      onUpdateStatus(expense.id, e.target.checked)
                    }
                  />
                </div>
                <Button
                  text="Edit"
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleExpenseForm(expense.id)}
                />
                <Button
                  text="Delete"
                  variant="delete"
                  size="sm"
                  onClick={() => setActiveSliderIndex(index)}
                />
              </div>
            </div>

            <ConfirmationSlider
              onConfirm={() => handleConfirmClick(expense.id)}
              onCancel={() => setActiveSliderIndex(undefined)}
              isActive={index === activeSliderIndex}
            />

            {selectedExpense === expense.id && (
              <div className={styles.expenseForm}>
                <ExpenseForm
                  onSubmit={handleSubmit}
                  onCancel={() => setSelectedExpense(undefined)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <div>No expenses to list for this group.</div>
  );
};

export default ExpenseList;
