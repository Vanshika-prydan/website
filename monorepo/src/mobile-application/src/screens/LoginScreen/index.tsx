import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { generateErrorMessage } from '../../utils/generate-error-message';
import LoginScreenPresenter from './presenter';
import AuthenticationService from '../../services/authentication-service';
import { useNavigation } from '@react-navigation/core';
import Screen from '../../navigation/screen';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Måste vara en giltig e-postadress')
    .required('Obligatoriskt'),
  password: Yup.string()
    .min(6, 'Lösenordet måste bestå av minst sex tecken.')
    .required('Obligatoriskt'),
});

const LoginScreen: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  const nav = useNavigation();

  const login = async () => {
    setIsLoading(true);
    try {
      await AuthenticationService.login({
        email: values.email.trim().toLowerCase(),
        password: values.password.trim(),
      });
    } catch (e) {
      Alert.alert('Kunde inte logga in', generateErrorMessage(e));
      setIsLoading(false);
      console.log(e);
    }
  };
  const { values, errors, handleChange, handleSubmit } = useFormik<FormValues>({
    initialValues,
    onSubmit: login,
    validationSchema,
  });
  useEffect(() => {
    setSubmitIsDisabled(Object.keys(errors).length > 0 || isLoading);

    return () => {
      setSubmitIsDisabled(true);
    };
  });

  return (
    <LoginScreenPresenter
      {...{
        email: values.email,
        emailError: errors.email,
        password: values.password,
        passwordError: errors.password,
        setEmail: handleChange('email'),
        setPassword: handleChange('password'),
        submitIsDisabled,
        onLogin: handleSubmit,
        onForgottenPassword: () => nav.navigate(Screen.FORGOTTEN_PASSWORD),
      }}
    />
  );
};

export default LoginScreen;
