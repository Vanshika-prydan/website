import PrimaryButton from '../../components/PrimaryButton';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInputProps,
  View,
} from 'react-native';
import SignedInContentBox from '../../components/SignedInContentBox';

import { useFormik, FormikErrors } from 'formik';
import validatePassword from '../../utils/validate-password';
import apiService from '../../services/api-service';
import { generateErrorMessage } from '../../utils/generate-error-message';
import { useNavigation } from '@react-navigation/core';
import NewEditField from '../../components/NewField/new-input-field';

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const Password: React.FunctionComponent = () => {
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  const passwordProps: TextInputProps = { secureTextEntry: true };

  const { handleChange, values, handleSubmit, touched, errors, handleBlur } =
    useFormik<FormValues>({
      initialValues: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      onSubmit: () => changePassword(),
      validate: (values) => {
        const errors: FormikErrors<FormValues> = {};
        if (values.currentPassword.length < 2) {
          errors.currentPassword = 'Fyll i ditt nuvarande lösenord';
        }
        if (!validatePassword(values.newPassword)) {
          errors.newPassword =
            'Lösenordet måste bestå av minst sex tecken varav minst en siffra.';
        }
        if (values.confirmNewPassword !== values.newPassword) {
          errors.confirmNewPassword = 'Lösenorden måste stämma överrens';
        }

        if (values.confirmNewPassword === '') {
          errors.confirmNewPassword = 'Fältet får inte vara tomt';
        }

        return errors;
      },
    });

  const changePassword = async () => {
    setIsLoading(true);
    try {
      await apiService.changePassword({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      setIsLoading(false);
      nav.goBack();
    } catch (e) {
      Alert.alert(generateErrorMessage(e));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSubmitIsDisabled(
      Object.keys(errors).length > 0 || values.currentPassword === ''
    );
  });

  return (
    <SignedInContentBox title="Lösenord">
      <View>
        <NewEditField
          label="Nuvarande lösenord"
          value={values.currentPassword}
          onChangeText={handleChange('currentPassword')}
          onBlur={handleBlur('currentPassword')}
          textInputProps={passwordProps}
          error={touched.currentPassword ? errors.currentPassword : undefined}
        />
        <NewEditField
          label="Nytt lösenord"
          value={values.newPassword}
          onChangeText={handleChange('newPassword')}
          onBlur={handleBlur('newPassword')}
          textInputProps={passwordProps}
          error={touched.newPassword ? errors.newPassword : undefined}
        />
        <NewEditField
          label="Repetera nytt lösenord"
          value={values.confirmNewPassword}
          onChangeText={handleChange('confirmNewPassword')}
          onBlur={handleBlur('confirmNewPassword')}
          textInputProps={passwordProps}
          error={
            touched.confirmNewPassword ? errors.confirmNewPassword : undefined
          }
        />
        <PrimaryButton
          disabled={submitIsDisabled}
          onPress={() => {
            handleSubmit();
          }}
        >
          Ändra lösenord
        </PrimaryButton>
        <ActivityIndicator animating={isLoading} />
      </View>
    </SignedInContentBox>
  );
};

export default Password;

const styles = StyleSheet.create({});
