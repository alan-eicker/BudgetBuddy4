import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { GiHamburgerMenu } from 'react-icons/gi';
import classnames from 'classnames';

import Logo from '../Logo';
import Button from '../Button';

import styles from './Header.module.scss';

export interface HeaderProps {
  nav: { text: string; url: string }[];
  baseUrl: string;
  logoUrl: string;
}

const HamburgerMenu = GiHamburgerMenu as unknown as React.FC;

const Header = ({ nav, logoUrl, baseUrl = '/' }: HeaderProps) => {
  const location = useLocation();

  const [activePath, setActivePath] = useState(location.pathname);

  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <header className={styles.header}>
      <Link
        className={styles.homeLink}
        to={baseUrl}
        aria-label="Go to dashboard"
      >
        <Logo logoUrl={logoUrl} />
      </Link>
      <nav>
        {isMediumScreen && (
          <ul className={styles.nav}>
            {nav.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  className={classnames(styles.nav__link, {
                    [styles.active]: activePath === item.url,
                  })}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Button text="Log Out" variant="secondary" onClick={() => {}} />
            </li>
          </ul>
        )}
        {!isMediumScreen && (
          <button className={styles.mobileMenuTrigger}>
            <HamburgerMenu />
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
