import db from '../../firebase';

import { useEffect, useState } from 'react';

import { ExpenseGroup, Expense, ExpenseType } from '../types/expenseGroups';
import { ErrorMessage } from '../types/common';
import { setDocRef } from '../helpers/data';

import { collection, getDocs } from '@firebase/firestore';

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
    }
  };

  const getExpenseTypes = async () => {
    setLoading(true);
    try {
      const docs = await getDocs(collection(db, 'ExpenseType'));
      const docRefs = setDocRef<ExpenseType>(docs);
      const expenseTypes = docRefs.map((type) => type.name).sort();

      setExpenseTypes(expenseTypes);
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
