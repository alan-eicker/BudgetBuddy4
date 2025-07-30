import * as yup from 'yup';
import { FormikHelpers } from 'formik';

export interface LoginFormValues {
    email: string;
    password: string;
}

const useLoginForm = () => {
    const initialValues: LoginFormValues = {
        email: '',
        password: ''
    };

    const validationSchema: yup.ObjectSchema<LoginFormValues> = yup.object({
        email: yup.string().email().required('Email Address is required'),
        password: yup.string().required('Password is required'),
    });

    const handleSubmit = (
        values: LoginFormValues,
        formikHelpers: FormikHelpers<LoginFormValues>,
    ): void => {
        // login user...
        console.log(values);
        formikHelpers.resetForm();
    };

    return {
        handleSubmit,
        initialValues,
        validationSchema
    };
};

export default useLoginForm;