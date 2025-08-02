import { Expense } from '../types/expenseGroups';

export const formatDate = (date: Date) => {
  return new Date(date).toDateString();
};

export const isOverDue = (date: Date) => {
  return new Date(date) < new Date();
};

export const getOverdueExpenses = (expenses: Expense[], groupId: string) => {
  return expenses
    .filter((expense) => expense.expenseGroupId === groupId)
    .map((expense) => isOverDue(expense.dueDate))
    .filter(Boolean);
};
