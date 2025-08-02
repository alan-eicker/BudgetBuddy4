import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormikHelpers } from 'formik';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export interface Expense {
  name: string;
  balance: number;
  dueDate?: string;
  type: string;
  paid?: boolean;
}

export interface StatusMessage {
  type: 'error' | 'success';
  message: string;
}

export interface ExpenseGroupFormValues {
  startDate: string;
  endDate: string;
  totalBudget: number;
  expenses: Expense[];
}

export interface UseExpenseGroupFormReturnType {
  statusMessage?: StatusMessage;
  initialValues: ExpenseGroupFormValues;
  validationSchema: yup.ObjectSchema<ExpenseGroupFormValues>;
  handleSubmit: (
    values: ExpenseGroupFormValues,
    formikHelpers: FormikHelpers<ExpenseGroupFormValues>,
  ) => void;
}

const useExpenseGroupForm = (): UseExpenseGroupFormReturnType => {
  const [statusMessage, setStatusMessage] = useState<StatusMessage>();

  const navigate = useNavigate();

  const validationSchema: yup.ObjectSchema<ExpenseGroupFormValues> = yup.object(
    {
      startDate: yup.string().required('Start date is required'),
      endDate: yup.string().required('End date is required'),
      totalBudget: yup
        .number()
        .typeError('Total budget must be a number')
        .min(1, 'Total budget must be greater than 0')
        .required('Total budget is required'),
      expenses: yup
        .array()
        .of(
          yup.object({
            name: yup.string().required('Expense name is required'),
            balance: yup
              .number()
              .typeError('Balance must be a number')
              .min(0.01, 'Balance must be greater than zero')
              .required('Balance is required'),
            type: yup.string().required('Type is required'),
            paid: yup.bool().optional(),
          }),
        )
        .min(1, 'At least one expense is required')
        .required('Expenses are required'),
    },
  );

  const initialValues: ExpenseGroupFormValues = {
    startDate: '',
    endDate: '',
    totalBudget: 0,
    expenses: [],
  };

  const handleSubmit = (
    values: ExpenseGroupFormValues,
    formikHelpers: FormikHelpers<ExpenseGroupFormValues>,
  ) => {
    try {
      addExpenseGroup(values);
      navigate('/dashboard');
    } catch (e) {
      setStatusMessage({
        type: 'error',
        message: `Error creating expense group: ${(e as Error).message}`,
      });
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const addExpenseGroup = async (
    values: ExpenseGroupFormValues,
  ): Promise<void> => {
    try {
      const { expenses, ...expenseGroupValues } = values;
      const expenseGroupRef = await addDoc(
        collection(db, 'ExpenseGroup'),
        expenseGroupValues,
      );

      if (expenseGroupRef.id) {
        for (const expense of expenses) {
          await addDoc(collection(db, 'Expense'), {
            expenseGroupId: expenseGroupRef.id,
            ...expense,
          });
        }
      }
    } catch (e) {
      throw new Error(`Error adding document: ${e}`);
    }
  };

  return {
    statusMessage,
    validationSchema,
    initialValues,
    handleSubmit,
  };
};

export default useExpenseGroupForm;
