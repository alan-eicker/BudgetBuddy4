import { Helmet } from 'react-helmet-async';

import ExpenseGroupGrid from '../../components/ExpenseGroupGrid';

import { useAppContext } from '../../shared/providers/AppProvider';

const HomePage = () => {
  const { expenseGroups } = useAppContext();

  return (
    <>
      <Helmet>
        <title>Budget Buddy | Dashboard</title>
      </Helmet>
      <ExpenseGroupGrid expenseGroupData={expenseGroups} />
    </>
  );
};

export default HomePage;
