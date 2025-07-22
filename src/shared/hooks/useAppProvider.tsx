import { useEffect, useState } from 'react';

import { ExpenseGroup, Expense } from '../types/expenseGroups';
import { ErrorMessage } from '../types/common';

const useAppProvider = () => {
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroup[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage>();

  useEffect(() => {
    getExpenseGroups();
    getExpenseTypes();
  }, []);

  const getExpenseGroups = async () => {
    setLoading(true);
    try {
      setExpenseGroups([
        {
          id: '1',
          totalBudget: 4500,
          startDate: new Date('07/04/2025'),
          endDate: new Date('07/18/2025'),
        },
        {
          id: '2',
          totalBudget: 4500,
          startDate: new Date('07/18/2025'),
          endDate: new Date('08/01/2025'),
        },
        {
          id: '3',
          totalBudget: 4500,
          startDate: new Date('08/01/2025'),
          endDate: new Date('08/15/2025'),
        },
        {
          id: '4',
          totalBudget: 4500,
          startDate: new Date('08/15/2025'),
          endDate: new Date('08/29/2025'),
        },
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getExpenses = async (groupId: string) => {
    setLoading(true);
  };

  const getExpenseTypes = async () => {
    setLoading(true);
    try {
      setExpenseTypes([
        'All',
        'Housing',
        'Utilities',
        'Medical',
        'Groceries',
        'Entertainment',
        'Investing',
        'Misc',
      ]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    expenseTypes,
    expenseGroups,
    expenses,
    getExpenses,
    getExpenseTypes,
    getExpenseGroups,
    loading,
    error,
  };
};

export default useAppProvider;
