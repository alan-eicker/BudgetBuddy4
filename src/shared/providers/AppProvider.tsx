import { createContext, useContext } from 'react';

import { NAV, COPYRIGHT_TEXT, APP_NAME } from '../../constants/site';

import { ExpenseGroup } from '../../types/expenseGroups';

const expenseGroupData = [
  {
    id: '1',
    totalBudget: 4500,
    startDate: new Date('07/04/2025'),
    endDate: new Date('07/18/2025'),
  },
  {
    id: '2',
    totalBudget: 4500,
    startDate: new Date('07/18/2025'),
    endDate: new Date('08/01/2025'),
  },
  {
    id: '3',
    totalBudget: 4500,
    startDate: new Date('08/01/2025'),
    endDate: new Date('08/15/2025'),
  },
  {
    id: '4',
    totalBudget: 4500,
    startDate: new Date('08/15/2025'),
    endDate: new Date('08/29/2025'),
  },
];

const AppContext = createContext<{
  staticSiteContent: {
    copyrightText: string;
    nav: { text: string; url: string }[];
    appName: string;
  };
  expenseGroups: ExpenseGroup[];
} | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider
      value={{
        staticSiteContent: {
          appName: APP_NAME,
          copyrightText: COPYRIGHT_TEXT,
          nav: NAV,
        },
        expenseGroups: expenseGroupData,
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
