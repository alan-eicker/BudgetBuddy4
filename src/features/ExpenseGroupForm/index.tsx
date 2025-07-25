import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import Button from '../../components/Button';

import useExpenseGroupForm from './useExpenseGroupForm';

import styles from './ExpenseGroupForm.module.scss';

export interface ExpenseGroupFormProps {
  expenseGroupId?: string;
}

const ExpenseGroupForm = ({ expenseGroupId }: ExpenseGroupFormProps) => {
  const { initialValues, validationSchema, handleSubmit } =
    useExpenseGroupForm(expenseGroupId);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className={styles.expenseGroupForm}>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <Field id="startDate" type="date" name="startDate" />
            <ErrorMessage
              name="startDate"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label htmlFor="endDate">End Date</label>
            <Field id="endDate" type="date" name="endDate" />
            <ErrorMessage
              name="endDate"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label htmlFor="totalBudget">Total Budget</label>
            <Field id="totalBudget" type="number" name="totalBudget" />
            <ErrorMessage
              name="totalBudget"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <h2 className={styles.expenseFieldsetTitle}>Expenses</h2>
            <FieldArray name="expenses">
              {({ push, remove }) => (
                <div className={styles.expenseFields}>
                  {values.expenses.length === 0 && (
                    <div>Please add at least one expense.</div>
                  )}

                  {values.expenses.map((_, index) => (
                    <>
                      <div key={index} className={styles.expenseFieldset}>
                        <div>
                          <label>Name</label>
                          <Field type="text" name={`expenses[${index}].name`} />
                        </div>
                        <div>
                          <label>Balance</label>
                          <Field
                            name={`expenses[${index}].balance`}
                            type="number"
                            placeholder="balance"
                          />
                        </div>
                        <div>
                          <label>Due Date</label>
                          <Field
                            type="date"
                            name={`expenses[${index}].dueDate`}
                            placeholder="Due date"
                          />
                        </div>
                        <div>
                          <label>Type</label>
                          <Field as="select" name={`expenses[${index}].type`}>
                            <option value="">Type</option>
                            {/* Dynamically add options for expense types */}
                            <option value="recurring">Housing</option>
                          </Field>
                        </div>

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
