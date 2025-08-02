import { Expense } from '../../shared/types/expenseGroups';

import { toDollarAmountString } from '../../utils/numbers';

import ExpenditureToBudget from '../../components/ExpenseToBudgetRatio';

import styles from './SpendingSnapshot.module.scss';

export interface SpendingSnapshotProps {
  expenses?: Expense[];
  totalBudget?: number;
}

const SpendingSnapshot = ({ expenses, totalBudget }: SpendingSnapshotProps) => {
  const rawTotalBalance = expenses
    ? expenses.reduce((prev, next) => {
        return prev + next.balance;
      }, 0)
    : 0;

  const totalBalance = toDollarAmountString(rawTotalBalance);

  const unpaidBalance = toDollarAmountString(
    expenses
      ? expenses
          .filter((expense) => !expense.paid)
          .reduce((acc, expense) => {
            return acc + expense.balance;
          }, 0)
      : 0,
  );

  const rawLeftOverBalance = totalBudget ? totalBudget - rawTotalBalance : 0;

  const leftOverBalance = toDollarAmountString(
    rawLeftOverBalance > 0 ? rawLeftOverBalance : 0,
  );

  return (
    <div className={styles.spendingSnapshot}>
      <h2 className={styles.spendingSnapshotTitle}>Spending Snapshot</h2>
      <div className={styles.spendingSnapshotDetails}>
        <div>
          <ExpenditureToBudget
            totalExpenses={rawTotalBalance}
            totalBudget={totalBudget ?? 0}
          />
        </div>
        <div>
          <h3 className={styles.snapshotTitle}>Total Balance</h3>
          <div className={styles.snapshotAmount}>{totalBalance}</div>
        </div>
        <div>
          <h3 className={styles.snapshotTitle}>Unpaid Balance</h3>
          <div className={styles.snapshotAmount}>{unpaidBalance}</div>
        </div>
        <div>
          <h3 className={styles.snapshotTitle}>Left Over Balance</h3>
          <div className={styles.snapshotAmount}>{leftOverBalance}</div>
        </div>
      </div>
    </div>
  );
};

export default SpendingSnapshot;
