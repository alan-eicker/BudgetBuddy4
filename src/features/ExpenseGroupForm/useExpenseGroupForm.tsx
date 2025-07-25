import * as yup from 'yup';
import { FormikHelpers } from 'formik';

// Define the shape of an individual expense
export interface Expense {
  name: string;
  balance: number;
  dueDate: string;
  type: string;
}

// Define the full form's values
export interface ExpenseGroupFormValues {
  startDate: string;
  endDate: string;
  totalBudget: number;
  expenses: Expense[];
}

// Define the return type for the custom hook
export interface UseExpenseGroupFormReturnType {
  initialValues: ExpenseGroupFormValues;
  validationSchema: yup.ObjectSchema<ExpenseGroupFormValues>;
  handleSubmit: (
    values: ExpenseGroupFormValues,
    formikHelpers: FormikHelpers<ExpenseGroupFormValues>,
  ) => void;
}

const useExpenseGroupForm = (
  expenseGroupId?: string,
): UseExpenseGroupFormReturnType => {
  const validationSchema: yup.ObjectSchema<ExpenseGroupFormValues> = yup.object(
    {
      startDate: yup.string().required('Start date is required'),
      endDate: yup.string().required('End date is required'),
      totalBudget: yup
        .number()
        .typeError('Total budget must be a number')
        .min(1, 'Total budget must be greater than 0')
        .required('Total budget is required'), // <-- required explicitly
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
            dueDate: yup.string().required('Due date is required'),
            type: yup.string().required('Type is required'),
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
    console.log('Form submitted:', values);
    formikHelpers.setSubmitting(false);
  };

  return {
    validationSchema,
    initialValues,
    handleSubmit,
  };
};

export default useExpenseGroupForm;
