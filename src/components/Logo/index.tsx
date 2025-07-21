import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.logo} aria-label="Go to dashboard">
      <img src="./images/logo.png" alt="Logo" />
    </div>
  );
};

export default Logo;
