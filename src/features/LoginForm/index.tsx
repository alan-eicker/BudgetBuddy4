import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import styles from './LoginForm.module.scss';

import Logo from '../../components/Logo';
import Button from '../../components/Button';

import { useAppContext } from '../../shared/providers/AppProvider';
import useLoginForm from './useLoginForm';

const LoginForm = () => {
    const { staticSiteContent } = useAppContext();
    const {
      handleSubmit,
      initialValues,
      validationSchema
    } = useLoginForm();

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
              <Logo logoUrl={`${staticSiteContent.baseUrl}images/logo.png`} />
            </div>
            <div>
              <Field type="text" name="email" placeholder="Email Address" />
              <ErrorMessage
                  name="email"
                  component="div"
                  className="error"
                />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error"
              />
            </div>
            <div>
              <Button type="submit" text="Log In" variant="tertiary" isFullWidth />
            </div>
          </Form>
         )}
      </Formik>
    );
};

export default LoginForm;