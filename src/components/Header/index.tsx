import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

export interface HeaderProps {
  nav: { text: string; url: string }[];
}

const Header = ({ nav }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Link to="/" aria-label="Go to dashboard">
        <img
          className={styles.logo}
          src="/images/logo.png"
          alt="Budget Buddy logo"
        />
      </Link>
      <nav>
        <ul className={styles.nav}>
          {nav.map((item, index) => (
            <li key={index}>
              <Link to={item.url} className={styles.nav__link}>
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
