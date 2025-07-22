import { createContext, useContext } from 'react';

import { NAV, COPYRIGHT_TEXT, APP_NAME } from '../../constants/site';

import useAppProvider from '../hooks/useAppProvider';

import { ExpenseGroup, Expense } from '../types/expenseGroups';

const AppContext = createContext<{
  staticSiteContent: {
    copyrightText: string;
    nav: { text: string; url: string }[];
    appName: string;
  };
  expenseGroups: ExpenseGroup[];
  expenseTypes: string[];
  allExpenses: Expense[];
  error: string | undefined;
} | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { expenseGroups, expenseTypes, allExpenses, error } = useAppProvider();

  return (
    <AppContext.Provider
      value={{
        staticSiteContent: {
          appName: APP_NAME,
          copyrightText: COPYRIGHT_TEXT,
          nav: NAV,
        },
        expenseGroups,
        expenseTypes,
        allExpenses,
        error: error ? error.toString() : undefined,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
export default AppProvider;
