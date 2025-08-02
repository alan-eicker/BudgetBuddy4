import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Switch from '../../components/Switch';

import styles from './ExpenseForm.module.scss';

// id: string;
// expenseGroupId: string;

export type ExpenseFormType = 'new' | 'edit';

export interface ExpenseFormProps {
  onSubmit: (values: ExpenseFormValues, type: ExpenseFormType) => void;
  onCancel: () => void;
}

export interface ExpenseFormValues {
  name: string;
  balance: number;
  type: string;
  paid: boolean;
  dueDate: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Expense name is required'),
  balance: Yup.number()
    .typeError('Balance must be a number')
    .min(0.01, 'Balance must be greater than zero')
    .required('Balance is required'),
  type: Yup.string().required('Type is required'),
  paid: Yup.bool().optional(),
  dueDate: Yup.bool().optional(),
});

const ExpenseForm = ({ onSubmit, onCancel }: ExpenseFormProps) => {
  const initialValues = {
    name: '',
    balance: 0,
    dueDate: '',
    type: '',
    paid: false,
  };

  const handleSubmit = (values: ExpenseFormValues) => {
    onSubmit(values, 'edit');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.expensForm}>
        <div>
          <label htmlFor="name">Expense Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>
        <div className={styles.expenseInfoFields}>
          <div>
            <label htmlFor="balance">Balance</label>
            <Field name="balance" type="number" step="0.01" />
            <ErrorMessage name="balance" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="dueDatte">Due Date</label>
            <Field name="dueDatte" type="date" />
            <ErrorMessage name="dueDatte" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <Field as="select" name="type">
              <option value="">Select a type</option>
              <option value="utility">Utility</option>
              <option value="groceries">Groceries</option>
              <option value="rent">Rent</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage name="type" component="div" className="error" />
          </div>
          <div>
            <label>Paid</label>
            <Switch />
          </div>
        </div>
        <div className={styles.actionButtons}>
          <Button type="submit" text="Save" variant="tertiary" />
          <Button
            type="button"
            text="Cancel"
            variant="secondary"
            onClick={onCancel}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default ExpenseForm;
