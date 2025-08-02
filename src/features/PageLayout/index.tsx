import { useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoaderOverlay from '../../components/LoaderOverlay';
import Notification from '../../components/Notification';
import LogoutButton from '../LogoutButton';

import { useAppContext } from '../../providers/AppProvider';

import { Message } from '../../types/common';

import styles from './PageLayout.module.scss';

export interface PageLayoutProps {
  children?: React.ReactNode;
  hasHero?: boolean;
  heroMinHeight?: number | string;
  loggedIn?: boolean;
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
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

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
          nav={staticSiteContent.nav}
          baseUrl="/dashboard"
          logoUrl={`${staticSiteContent.baseUrl}images/logo.png`}
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
