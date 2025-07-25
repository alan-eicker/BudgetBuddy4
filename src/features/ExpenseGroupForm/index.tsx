import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';

import styles from './ExpenseGroupForm.module.scss';
import Button from '../../components/Button';

export interface ExpenseGroupFormProps {
  expenseGroupId?: string;
}

// ✅ Yup validation schema
const validationSchema = yup.object({
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  totalBudget: yup
    .number()
    .typeError('Total budget must be a number')
    .min(1, 'Total budget is required'),
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
});

const ExpenseGroupForm = ({ expenseGroupId }: ExpenseGroupFormProps) => {
  const initialValues = {
    startDate: '',
    endDate: '',
    totalBudget: 0,
    expenses: [],
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form submitted:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className={styles.expenseGroupForm}>
          <div>
            <label>Start Date</label>
            <Field type="date" name="startDate" />
            <ErrorMessage
              name="startDate"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label>End Date</label>
            <Field type="date" name="endDate" />
            <ErrorMessage
              name="endDate"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label>Total Budget</label>
            <Field type="number" name="totalBudget" />
            <ErrorMessage
              name="totalBudget"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label className={styles.expenseFieldsetTitle}>Expenses</label>
            <FieldArray name="expenses">
              {({ push, remove }) => (
                <div className={styles.expenseFields}>
                  {values.expenses.length === 0 && (
                    <p>Please add at least one expense.</p>
                  )}

                  {values.expenses.map((_, index) => (
                    <>
                      <div key={index} className={styles.expenseFieldset}>
                        <Field
                          type="text"
                          name={`expenses[${index}].name`}
                          placeholder="Expense name"
                        />
                        <Field
                          name={`expenses[${index}].balance`}
                          type="number"
                          placeholder="balance"
                        />
                        <Field
                          type="date"
                          name={`expenses[${index}].dueDate`}
                          placeholder="Due date"
                        />
                        <Field as="select" name={`expenses[${index}].type`}>
                          <option value="">Type</option>
                          {/* Dynamically add options for expense types */}
                          <option value="recurring">Housing</option>
                        </Field>

                        <Button
                          type="button"
                          text="Remove"
                          variant="secondary"
                          onClick={() => remove(index)}
                        />
                      </div>
                      <div className={styles.error}>
                        <ErrorMessage
                          component="div"
                          name={`expenses[${index}].name`}
                        />
                        <ErrorMessage
                          component="div"
                          name={`expenses[${index}].balance`}
                        />
                        <ErrorMessage
                          component="div"
                          name={`expenses[${index}].dueDate`}
                        />
                        <ErrorMessage
                          component="div"
                          name={`expenses[${index}].type`}
                        />
                      </div>
                    </>
                  ))}

                  <Button
                    type="button"
                    text="Add Expense"
                    variant="secondary"
                    onClick={() =>
                      push({
                        name: '',
                        balance: 0,
                        dueDate: '',
                        type: '',
                      })
                    }
                  />
                </div>
              )}
            </FieldArray>
          </div>

          <Button size="lg" type="submit" text="Submit" variant="tertiary" />
        </Form>
      )}
    </Formik>
  );
};

export default ExpenseGroupForm;
