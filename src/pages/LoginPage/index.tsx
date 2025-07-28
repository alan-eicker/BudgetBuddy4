import Button from '../../components/Button';
import Logo from '../../components/Logo';

import { useAppContext } from '../../shared/providers/AppProvider';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const { staticSiteContent } = useAppContext();

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <div className={styles.logoContainer}>
          <Logo logoUrl={`${staticSiteContent.baseUrl}images/logo.png`} />
        </div>
        <div>
          <input type="text" placeholder="Username" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <Button type="submit" text="Log In" variant="tertiary" isFullWidth />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
