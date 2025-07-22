import { Expense } from '../types/expenseGroups';
import { ChartData } from '../types/chart';

export const aggregateExpensesByMonth = (
  expenses: Expense[],
  monthlyBudget = 9000,
  filter = 'All',
): ChartData[] => {
  const now = new Date();
  const resultMap = new Map();

  const filteredExpenses =
    filter !== 'All'
      ? expenses.filter((expense) => expense.type === filter)
      : expenses;

  // Initialize map for last 12 months
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    resultMap.set(key, {
      name: date.toLocaleString('default', { month: 'short' }),
      totalBalance: 0,
      overageTotal: 0,
    });
  }

  // Aggregate expenses
  for (const expense of filteredExpenses) {
    const date = new Date(expense.dueDate);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (resultMap.has(key)) {
      const monthData = resultMap.get(key);

      monthData.totalBalance += expense.amount;
      monthData.overageTotal = Math.max(
        0,
        monthData.totalBalance - monthlyBudget,
      );

      if (monthData.overageTotal === 0) {
        console.log(monthData.overageTotal);
        monthData.budgetTotal = monthData.totalBalance;
      } else {
        monthData.budgetTotal = monthlyBudget;
      }
    }
  }

  // Convert map to array and reverse to chronological order
  return Array.from(resultMap.values()).reverse();
};
