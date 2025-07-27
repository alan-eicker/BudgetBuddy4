import Header from '../Header';
import Footer from '../Footer';

import { useAppContext } from '../../shared/providers/AppProvider';

import LoaderOverlay from '../LoaderOverlay';
import Notification from '../Notification';

import { Message } from '../../shared/types/common';

import styles from './PageLayout.module.scss';

export interface PageLayoutProps {
  children?: React.ReactNode;
  hasHero?: boolean;
  heroMinHeight?: number | string;
  loading: boolean;
  error?: Message;
}

const PageLayout = ({
  children,
  hasHero = true,
  heroMinHeight = 250,
  loading = false,
  error,
}: PageLayoutProps) => {
  const { staticSiteContent } = useAppContext();

  return (
    <div
      className={styles.pageLayout}
      style={
        {
          '--heroMinHeight': `${heroMinHeight}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.pageLayout__header}>
        <Header
          nav={staticSiteContent.nav}
          baseUrl={staticSiteContent.baseUrl}
          logoUrl={`${staticSiteContent.baseUrl}images/logo.png`}
        />
      </div>
      {loading ? (
        <LoaderOverlay heightOffset={60} />
      ) : (
        <>
          {error ? (
            <main className={styles.pageLayout__main}>
              <Notification {...error} />
            </main>
          ) : (
            <>
              {hasHero && (
                <div className={styles.pageLayout__hero}>
                  <div
                    id="hero-section"
                    className={styles.pageLayout__hero__content}
                  />
                </div>
              )}
              <main className={styles.pageLayout__main}>
                <div className={styles.pageLayout__content}>{children}</div>
                <Footer copyrightText={staticSiteContent.copyrightText} />
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PageLayout;
