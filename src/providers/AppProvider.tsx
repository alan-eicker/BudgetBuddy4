import { createContext, useContext } from 'react';

import { NAV, COPYRIGHT_TEXT, APP_NAME, BASE_URL } from '../constants/site';

import useAppProvider from '../hooks/useAppProvider';

import { ExpenseGroup, Expense } from '../types/expenseGroups';

const AppContext = createContext<{
  staticSiteContent: {
    copyrightText: string;
    nav: { text: string; url: string }[];
    appName: string;
    baseUrl: string;
  };
  expenseGroups: ExpenseGroup[];
  expenseTypes: string[];
  allExpenses: Expense[];
  error: string | undefined;
  loading: boolean;
} | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { expenseGroups, expenseTypes, allExpenses, error, loading } =
    useAppProvider();

  return (
    <AppContext.Provider
      value={{
        staticSiteContent: {
          appName: APP_NAME,
          copyrightText: COPYRIGHT_TEXT,
          nav: NAV,
          baseUrl: BASE_URL,
        },
        expenseGroups,
        expenseTypes,
        allExpenses,
        error: error ? error.toString() : undefined,
        loading,
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
