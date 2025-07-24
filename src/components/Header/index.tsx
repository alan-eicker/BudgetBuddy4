import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

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
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setActivePath(location.pathname);
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
        <button
          className={styles.mobileMenuTrigger}
          onClick={() => setShowMenu(!showMenu)}
        >
          <HamburgerMenu />
        </button>
      </nav>
    </header>
  );
};

export default Header;
