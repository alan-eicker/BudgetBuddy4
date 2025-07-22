import { useEffect, useState } from 'react';

import { ExpenseGroup, Expense } from '../types/expenseGroups';
import { ErrorMessage } from '../types/common';

const useAppProvider = () => {
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroup[]>([]);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage>();

  useEffect(() => {
    getExpenseGroups();
    getExpenseTypes();
    getAllExpenses();
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

  const getAllExpenses = async () => {
    setLoading(true);
    try {
      setAllExpenses([
        {
          id: '0',
          groupId: '0',
          amount: 2300,
          dueDate: new Date('05/01/2025'),
          type: 'Entertainment',
        },
        {
          id: '1',
          groupId: '1',
          amount: 2300,
          dueDate: new Date('06/01/2025'),
          type: 'Housing',
        },
        {
          id: '2',
          groupId: '2',
          amount: 10670,
          dueDate: new Date('06/15/2025'),
          type: 'Medical',
        },
        {
          id: '3',
          groupId: '3',
          amount: 8670,
          dueDate: new Date('07/01/2025'),
          type: 'Medical',
        },
        {
          id: '4',
          groupId: '4',
          amount: 1500,
          dueDate: new Date('07/15/2025'),
          type: 'Travel',
        },
        {
          id: '5',
          groupId: '0',
          amount: 10000,
          dueDate: new Date('05/22/2025'),
          type: 'Travel',
        },
        {
          id: '6',
          groupId: '5',
          amount: 2300,
          dueDate: new Date('04/01/2025'),
          type: 'Housing',
        },
      ]);
    } catch (err: any) {
      setError(err.message);
    }
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
        'Travel',
        'Misc',
      ]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    expenseTypes,
    expenseGroups,
    allExpenses,
    getAllExpenses,
    getExpenseTypes,
    getExpenseGroups,
    loading,
    error,
  };
};

export default useAppProvider;
