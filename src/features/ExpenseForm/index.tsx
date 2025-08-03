import { Formik, Form, Field, ErrorMessage } from 'formik';

import Button from '../../components/Button';
import Switch from '../../components/Switch';

import useExpenseForm from './useExpenseForm';

import styles from './ExpenseForm.module.scss';

export interface ExpenseFormProps {
  onCancel: () => void;
}

const ExpenseForm = ({ onCancel }: ExpenseFormProps) => {
  const { initialValues, validationSchema, handleSubmit } = useExpenseForm();

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
            <div className={styles.paidSwitch}>
              <Switch />
            </div>
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
