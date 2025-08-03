import classnames from 'classnames';

import { Expense } from '../../types/expenseGroups';

import Button from '../../components/Button';
import Switch from '../../components/Switch';
import ConfirmationSlider from '../../components/ConfirmationSlider';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';

import ExpenseForm from '../ExpenseForm';

import { toDollarAmountString } from '../../utils/numbers';
import { formatDate, isOverDue } from '../../utils/dates';

import useExpenseList from './useExpenseList';

import styles from './ExpenseList.module.scss';

export interface ExpenseListProps {
  expenses?: Expense[];
}

const ExpenseList = ({ expenses = [] }: ExpenseListProps) => {
  const {
    notification,
    selectedExpense,
    activeSliderIndex,
    updateExpenseStatus,
    toggleExpenseForm,
    setActiveSliderIndex,
    setSelectedExpense,
    handleConfirmClick,
    handleSubmitClick,
  } = useExpenseList();

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
                      updateExpenseStatus(expense.id, e.target.checked)
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
                  onSubmit={handleSubmitClick}
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
