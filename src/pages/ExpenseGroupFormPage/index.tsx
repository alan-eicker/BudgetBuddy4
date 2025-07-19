import { useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const ExpenseGroupFormPage = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <PageLayout docTitle={`BudgetBuddy | ${id ? 'Edit' : 'Add'} Expense Group`}>
      <h1>{id ? 'Edit' : 'Add'} Expense Group Form Page</h1>
      <p>This is the expense group form page.</p>
    </PageLayout>
  );
};

export default ExpenseGroupFormPage;
