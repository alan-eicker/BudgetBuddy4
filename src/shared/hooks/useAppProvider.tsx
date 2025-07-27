import { useEffect, useState } from 'react';
import * as _ from 'lodash';

import db from '../../firebase';

import { ExpenseGroup, Expense, ExpenseType } from '../types/expenseGroups';
import { Message } from '../types/common';
import { setDocRef } from '../helpers/data';

import { collection, getDocs } from '@firebase/firestore';

export interface UseAppProviderReturnType {
  expenseGroups: ExpenseGroup[];
  expenseTypes: string[];
  allExpenses: Expense[];
  loading: boolean;
  error?: Message;
  getExpenseGroupById: (groupId: string) => ExpenseGroup | undefined;
  getExpensesByGroupId: (expenseGroupId: string) => Expense[] | undefined;
}

const useAppProvider = (): UseAppProviderReturnType => {
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroup[]>([]);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Message>();

  const getExpenseGroups = async (): Promise<ExpenseGroup[]> => {
    try {
      const docs = await getDocs(collection(db, 'ExpenseGroup'));
      const docRefs = _.orderBy(
        setDocRef<ExpenseGroup>(docs),
        ['startDate'],
        ['desc'],
      );

      return docRefs;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getAllExpenses = async (): Promise<Expense[]> => {
    try {
      const docs = await getDocs(collection(db, 'Expense'));
      const docRefs = _.orderBy(
        setDocRef<Expense>(docs),
        ['dueDate'],
        ['desc'],
      );

      return docRefs;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getExpenseTypes = async (): Promise<string[]> => {
    try {
      const docs = await getDocs(collection(db, 'ExpenseType'));
      const docRefs = _.orderBy(setDocRef<ExpenseType>(docs), ['name']).map(
        (type) => type.name,
      );

      return docRefs;
    } catch (err: any) {
      throw new Error(err.message);
    }
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

  useEffect(() => {
    const cachedData = sessionStorage.getItem('bb-expense-data');

    if (cachedData) {
      const [expenseGroupDocs, allExpenseDocs, expenseTypeDocs] =
        JSON.parse(cachedData);
      setExpenseGroups(expenseGroupDocs);
      setAllExpenses(allExpenseDocs);
      setExpenseTypes(expenseTypeDocs);
    } else {
      setLoading(true);
      Promise.all([getExpenseGroups(), getAllExpenses(), getExpenseTypes()])
        .then((response) => {
          const [expenseGroupDocs, allExpenseDocs, expenseTypeDocs] = response;
          sessionStorage.setItem('bb-expense-data', JSON.stringify(response));
          setExpenseGroups(expenseGroupDocs);
          setAllExpenses(allExpenseDocs);
          setExpenseTypes(expenseTypeDocs);
        })
        .catch((err) => {
          setError({ type: 'error', message: err.message });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

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
