import Header from '../Header';
import Footer from '../Footer';

import { useAppContext } from '../../shared/providers/AppProvider';

import styles from './PageLayout.module.scss';

export interface PageLayoutProps {
  children?: React.ReactNode;
  hasHero?: boolean;
  heroContent?: React.ReactNode;
}

const PageLayout = ({
  children,
  heroContent,
  hasHero = false,
}: PageLayoutProps) => {
  const { staticSiteContent } = useAppContext();

  return (
    <div className={styles.pageLayout}>
      <div className={styles.pageLayout__header}>
        <Header
          nav={staticSiteContent.nav}
          appName={staticSiteContent.appName}
        />
      </div>
      {hasHero && (
        <div className={styles.pageLayout__hero}>
          <div className={styles.pageLayout__hero__content}>{heroContent}</div>
        </div>
      )}
      <main className={styles.pageLayout__main}>
        <div className={styles.pageLayout__content}>{children}</div>
        <Footer copyrightText={staticSiteContent.copyrightText} />
      </main>
    </div>
  );
};

export default PageLayout;
