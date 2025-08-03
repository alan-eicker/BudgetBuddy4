import { Dispatch, SetStateAction, useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../firebase';

import { ExpenseFormValues, ExpenseFormType } from '../ExpenseForm';

import { NotificationProps } from '../../components/Notification';

export interface UseExpenseListReturn {
  activeSliderIndex: number | undefined;
  selectedExpense: string | undefined;
  notification: NotificationProps | undefined;
  setActiveSliderIndex: Dispatch<SetStateAction<number | undefined>>;
  setSelectedExpense: Dispatch<SetStateAction<string | undefined>>;
  setNotification: Dispatch<SetStateAction<NotificationProps | undefined>>;
  updateExpenseStatus: (expenseId: string, paid: boolean) => void;
  toggleExpenseForm: (expenseId: string) => void;
  handleConfirmClick: (expenseId: string) => Promise<void>;
  handleSubmitClick: (values: ExpenseFormValues, type: ExpenseFormType) => void;
}

const useExpenseList = (): UseExpenseListReturn => {
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>();
  const [selectedExpense, setSelectedExpense] = useState<string>();
  const [notification, setNotification] = useState<NotificationProps>();

  const handleConfirmClick = async (expenseId: string): Promise<void> => {
    setActiveSliderIndex(undefined);
    try {
      const docRef = doc(db, 'Expense', expenseId);
      await deleteDoc(docRef);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Error: could not delete document',
      });
    }
  };

  const toggleExpenseForm = (expenseId: string): void => {
    setSelectedExpense(!selectedExpense ? expenseId : undefined);
  };

  const updateExpenseStatus = async (
    expenseId: string,
    paid: boolean,
  ): Promise<void> => {
    try {
      const docRef = doc(db, 'Expense', expenseId);
      await updateDoc(docRef, { paid });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const handleSubmitClick = (
    values: ExpenseFormValues,
    type: ExpenseFormType,
  ) => {
    setSelectedExpense(undefined);
  };

  return {
    activeSliderIndex,
    selectedExpense,
    notification,
    setActiveSliderIndex,
    setSelectedExpense,
    setNotification,
    updateExpenseStatus,
    toggleExpenseForm,
    handleConfirmClick,
    handleSubmitClick,
  };
};

export default useExpenseList;
