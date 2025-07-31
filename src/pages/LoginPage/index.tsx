import { Helmet } from 'react-helmet-async';

import styles from './LoginPage.module.scss';

import LoginForm from '../../features/LoginForm';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Budget Buddy | Log In</title>
      </Helmet>
      <div className={styles.loginPageContainer}>
        TEST
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
