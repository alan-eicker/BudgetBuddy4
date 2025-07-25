import { useEffect, useState } from 'react';
import * as _ from 'lodash';

import db from '../../firebase';

import { ExpenseGroup, Expense } from '../types/expenseGroups';
import { ErrorMessage } from '../types/common';
import { setDocRef } from '../helpers/data';

import { collection, getDocs } from '@firebase/firestore';

export interface UseAppProviderReturnType {
  expenseGroups: ExpenseGroup[];
  expenseTypes: string[];
  allExpenses: Expense[];
  loading: boolean;
  error?: ErrorMessage;
  getExpenseGroupById: (groupId: string) => ExpenseGroup | undefined;
  getExpensesByGroupId: (expenseGroupId: string) => Expense[] | undefined;
}

const useAppProvider = (): UseAppProviderReturnType => {
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroup[]>([]);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage>();

  useEffect(() => {
    getExpenseGroups();
    getAllExpenses();
  }, []);

  useEffect(() => {
    if (allExpenses.length) {
      getExpenseTypes();
    }
  }, [allExpenses]);

  const getExpenseGroups = async () => {
    setLoading(true);
    try {
      const docs = await getDocs(collection(db, 'ExpenseGroup'));
      const docRefs = setDocRef<ExpenseGroup>(docs);

      setExpenseGroups(docRefs);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllExpenses = async () => {
    setLoading(true);
    try {
      const docs = await getDocs(collection(db, 'Expense'));
      const docRefs = setDocRef<Expense>(docs);

      setAllExpenses(docRefs);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getExpenseTypes = async () => {
    const types = _.uniq(allExpenses.map((expense) => expense.type));
    setExpenseTypes(types);
  };

  const getExpenseGroupById = (groupId: string): ExpenseGroup | undefined => {
    return expenseGroups.find((group) => group.id === groupId);
  };

  const getExpensesByGroupId = (
    expenseGroupId: string,
  ): Expense[] | undefined => {
    return allExpenses.filter(
      (expense) => expense.expenseGroupId === expenseGroupId,
    );
  };

  return {
    expenseGroups,
    expenseTypes,
    allExpenses,
    loading,
    error,
    getExpenseGroupById,
    getExpensesByGroupId,
  };
};

export default useAppProvider;
