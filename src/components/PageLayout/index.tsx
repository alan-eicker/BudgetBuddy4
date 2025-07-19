import { Helmet } from 'react-helmet';

import Header from '../Header';
import Footer from '../Footer';

import styles from './PageLayout.module.scss';

export interface PageLayoutProps {
  docTitle?: string;
  children?: React.ReactNode;
}

const PageLayout = ({
  children,
  docTitle = 'Budget Buddy',
}: PageLayoutProps) => {
  return (
    <div className={styles.pageLayout}>
      <Helmet>
        <title>{docTitle}</title>
      </Helmet>
      <Header />
      <main className={styles.pageLayout__main}>
        <div className={styles.pageLayout__content}>{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
