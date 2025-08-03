import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

export interface ExpenseFormValues {
  name: string;
  balance: number;
  type: string;
  paid?: boolean;
  dueDate?: string;
}

export interface useExpenseFormReturnType {
  validationSchema: Yup.ObjectSchema<ExpenseFormValues>;
  initialValues: ExpenseFormValues;
  handleSubmit: (
    values: ExpenseFormValues,
    formikHelpers: FormikHelpers<ExpenseFormValues>,
  ) => void;
}

const useExpenseForm = (): useExpenseFormReturnType => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Expense name is required'),
    balance: Yup.number()
      .typeError('Balance must be a number')
      .min(0.01, 'Balance must be greater than zero')
      .required('Balance is required'),
    type: Yup.string().required('Type is required'),
    paid: Yup.bool().optional(),
    dueDate: Yup.string().optional(),
  });

  const initialValues = {
    name: '',
    balance: 0,
    dueDate: '',
    type: '',
    paid: false,
  };

  const handleSubmit = (values: ExpenseFormValues) => {
    // submit form...
    console.log(values);
  };

  return {
    validationSchema,
    initialValues,
    handleSubmit,
  };
};

export default useExpenseForm;
