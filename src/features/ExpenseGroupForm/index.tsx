import React from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import Button from '../../components/Button';
import Switch from '../../components/Switch';

import useExpenseGroupForm from './useExpenseGroupForm';
import { useAppContext } from '../../shared/providers/AppProvider';

import styles from './ExpenseGroupForm.module.scss';

export interface ExpenseGroupFormProps {
  expenseGroupId?: string;
}

const ExpenseGroupForm = ({ expenseGroupId }: ExpenseGroupFormProps) => {
  const { staticSiteContent, expenseTypes } = useAppContext();

  const { initialValues, validationSchema, handleSubmit, statusMessage } =
    useExpenseGroupForm(expenseGroupId);

  const newExpense = {
    name: '',
    balance: 0,
    dueDate: '',
    type: '',
    paid: false,
  };

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate(staticSiteContent.baseUrl);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.expenseGroupForm}>
          <div className={styles.formActionButtions}>
            <Button type="submit" text="Submit" variant="tertiary" />
            <Button
              type="button"
              text="Cancel"
              variant="secondary"
              onClick={handleCancelClick}
            />
          </div>
          {statusMessage && (
            <div
              className={classnames(styles.statusMessage, {
                [styles[statusMessage.type]]: statusMessage,
              })}
            >
              {statusMessage.message}
            </div>
          )}

          <div className={styles.fieldsetContainer}>
            <h2 className={styles.fieldsetTitle}>Expense Group Info</h2>
            <div className={styles.expenseGroupFields}>
              <div>
                <label htmlFor="startDate">Start Date</label>
                <Field id="startDate" type="date" name="startDate" />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="endDate">End Date</label>
                <Field id="endDate" type="date" name="endDate" />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="totalBudget">Total Budget</label>
                <Field id="totalBudget" type="number" name="totalBudget" />
                <ErrorMessage
                  name="totalBudget"
                  component="div"
                  className="error"
                />
              </div>
            </div>
          </div>

          <div className={styles.fieldsetContainer}>
            <h2 className={styles.fieldsetTitle}>Expenses</h2>
            <FieldArray name="expenses">
              {({ push, remove }) => (
                <div className={styles.expenseFields}>
                  {values.expenses.length === 0 && (
                    <div>Please add at least one expense.</div>
                  )}

                  {values.expenses.map((_, index) => (
                    <React.Fragment key={index}>
                      <div className={styles.expenseFieldset}>
                        <div>
                          <label htmlFor={`expenseName${index}`}>Name</label>
                          <Field
                            id={`expenseName${index}`}
                            type="text"
                            name={`expenses[${index}].name`}
                          />
                          <ErrorMessage
                            className="error"
                            component="div"
                            name={`expenses[${index}].name`}
                          />
                        </div>
                        <div>
                          <label htmlFor={`balance${index}`}>Balance</label>
                          <Field
                            id={`balance${index}`}
                            name={`expenses[${index}].balance`}
                            type="number"
                            placeholder="balance"
                          />
                          <ErrorMessage
                            className="error"
                            component="div"
                            name={`expenses[${index}].balance`}
                          />
                        </div>
                        <div>
                          <label htmlFor={`dueDate${index}`}>Due Date</label>
                          <Field
                            id={`dueDate${index}`}
                            type="date"
                            name={`expenses[${index}].dueDate`}
                            placeholder="Due date"
                          />
                          <ErrorMessage
                            className="error"
                            component="div"
                            name={`expenses[${index}].dueDate`}
                          />
                        </div>
                        <div>
                          <label htmlFor={`expenseType${index}`}>Type</label>
                          <Field
                            id={`expenseType${index}`}
                            as="select"
                            name={`expenses[${index}].type`}
                          >
                            <option value="">Type</option>
                            {expenseTypes.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            className="error"
                            component="div"
                            name={`expenses[${index}].type`}
                          />
                        </div>
                        <div>
                          <label htmlFor={`balance${index}`}>Is Paid</label>
                          <div className={styles.switchField}>
                            <Switch
                              checked={values.expenses[index].paid}
                              onChange={(e) => {
                                setFieldValue(
                                  `expenses[${index}].paid`,
                                  e.target.checked,
                                );
                              }}
                            />
                          </div>
                        </div>

                        <Button
                          type="button"
                          text="Remove"
                          variant="delete"
                          onClick={() => remove(index)}
                        />
                      </div>
                    </React.Fragment>
                  ))}

                  <Button
                    type="button"
                    text="Add Expense"
                    variant="secondary"
                    onClick={() => push(newExpense)}
                  />
                </div>
              )}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExpenseGroupForm;
