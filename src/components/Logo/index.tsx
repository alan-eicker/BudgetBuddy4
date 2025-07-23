import styles from './Logo.module.scss';

export interface LogoProps {
  logoUrl: string;
}

const Logo = ({ logoUrl }: LogoProps) => {
  return (
    <div className={styles.logo} aria-label="Go to dashboard">
      <img src={logoUrl} alt="Logo" />
    </div>
  );
};

export default Logo;
