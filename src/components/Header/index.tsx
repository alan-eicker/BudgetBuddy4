import { useState, useEffect, ReactNode } from 'react';
import classnames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import Logo from '../Logo';

import styles from './Header.module.scss';

export interface HeaderProps {
  nav: { text: string; url: string }[];
  baseUrl: string;
  logoUrl: string;
  showNav?: boolean;
  logoutButton?: ReactNode;
}

const HamburgerMenu = GiHamburgerMenu as unknown as React.FC;

const Header = ({ 
  nav, 
  logoUrl, 
  logoutButton,
  baseUrl = '/',
  showNav = true, 
}: HeaderProps) => {
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
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
      {showNav && (
        <nav>
          <ul
            className={classnames(styles.nav, {
              [styles.isOpen]: showMenu,
            })}
          >
            {nav.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  className={styles.nav__link}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            {logoutButton && <li>{logoutButton}</li>}
          </ul>
          <button
            className={styles.mobileMenuTrigger}
            onClick={() => setShowMenu(!showMenu)}
          >
            <HamburgerMenu />
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
