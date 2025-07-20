import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import styles from './Header.module.scss';
import { useEffect } from 'react';

export interface HeaderProps {
  nav: { text: string; url: string }[];
  appName: string;
}

const Header = ({ nav, appName }: HeaderProps) => {
  const location = useLocation();

  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/" aria-label="Go to dashboard">
        {appName}
      </Link>
      <nav>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
