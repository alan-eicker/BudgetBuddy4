export interface ExpenseGroup {
  id: string;
  totalBudget: number;
  startDate: Date;
  endDate: Date;
}

export interface Expense {
  id: string;
  groupId: string;
  amount: number;
  dueDate: Date;
  type: string;
}
