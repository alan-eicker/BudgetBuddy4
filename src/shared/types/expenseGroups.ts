export interface ExpenseGroup {
  id: string;
  totalBudget: number;
  startDate: Date;
  endDate: Date;
}

export interface Expense {
  id: string;
  name: string;
  expenseGroupId: string;
  balance: number;
  dueDate: Date;
  type: string;
}

export interface ExpenseType {
  name: string;
}
