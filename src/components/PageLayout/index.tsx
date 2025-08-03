import Header from '../Header';
import Footer from '../Footer';
import LoaderOverlay from '../LoaderOverlay';
import Notification from '../Notification';
import LogoutButton from '../../features/LogoutButton';

import { Message } from '../../types/common';

import styles from './PageLayout.module.scss';

export interface PageLayoutProps {
  children?: React.ReactNode;
  isLoginPage?: boolean;
  hasHero?: boolean;
  heroMinHeight?: number | string;
  loggedIn?: boolean;
  loading: boolean;
  error?: Message;
  nav: { text: string; url: string }[];
  baseUrl: string;
  copyrightText: string;
}

const PageLayout = ({
  children,
  isLoginPage = false,
  hasHero = true,
  heroMinHeight = 250,
  loading = false,
  error,
  nav,
  baseUrl,
  copyrightText,
}: PageLayoutProps) => {
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
          logoutButton={<LogoutButton />}
          nav={nav}
          baseUrl="/dashboard"
          logoUrl={`${baseUrl}images/logo.png`}
          showNav={!isLoginPage}
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
                <Footer copyrightText={copyrightText} />
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PageLayout;
