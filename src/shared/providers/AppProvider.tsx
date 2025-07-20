import { createContext, useContext } from 'react';

import { NAV, COPYRIGHT_TEXT } from '../../constants/site';

const AppContext = createContext<{
  staticSiteContent: {
    copyrightText: string;
    nav: { text: string; url: string }[];
  };
} | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider
      value={{ staticSiteContent: { copyrightText: COPYRIGHT_TEXT, nav: NAV } }}
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
