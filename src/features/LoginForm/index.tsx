import { Formik, Form, Field, ErrorMessage } from 'formik';

import Logo from '../../components/Logo';
import Button from '../../components/Button';

import useLoginForm from './useLoginForm';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { error, handleSubmit, initialValues, validationSchema } =
    useLoginForm();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.loginForm}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          {error && <div className="error">{error}</div>}
          <div>
            <Field type="text" name="email" placeholder="Email Address" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div>
            <Button
              type="submit"
              text="Log In"
              variant="tertiary"
              isFullWidth
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
