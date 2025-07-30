import { useState } from 'react';
import * as yup from 'yup';
import { FormikHelpers } from 'formik';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { app } from '../../firebase';

const auth = getAuth(app);

export interface LoginFormValues {
    email: string;
    password: string;
}


export interface UseLoginFormReturnType {
    error?: string;
    handleSubmit: (
        values: LoginFormValues,
        formikHelpers: FormikHelpers<LoginFormValues>
    ) => Promise<void>;
    initialValues: LoginFormValues;
    validationSchema: yup.ObjectSchema<LoginFormValues>;
}

const useLoginForm = (): UseLoginFormReturnType => {
    const [error, setError] = useState<string>();

    const navigate = useNavigate();

    const initialValues: LoginFormValues = {
        email: '',
        password: ''
    };

    const validationSchema: yup.ObjectSchema<LoginFormValues> = yup.object({
        email: yup.string().email().required('Email Address is required'),
        password: yup.string().required('Password is required'),
    });

    const handleSubmit = async (
        values: LoginFormValues,
        formikHelpers: FormikHelpers<LoginFormValues>,
    ): Promise<void> => {
        try {
            const user = await signInWithEmailAndPassword(auth, values.email, values.password);
            formikHelpers.resetForm();
            navigate('/dashboard');
        } catch {
            setError('Invalid user credentials');
        }
    };

    return {
        error,
        handleSubmit,
        initialValues,
        validationSchema
    };
};

export default useLoginForm;