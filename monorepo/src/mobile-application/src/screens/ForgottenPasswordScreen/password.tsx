import NewEditField from '../../components/NewField/new-input-field';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import validatePassword from '../../utils/validate-password';
import { Color } from '../../styles';
import SignedInButton from '../../components/SignedInButton';
import { BoldText, MediumText, RegularText } from '../../components/Text';

interface Props {
  onChangePassword(password: string): void;
}

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}
const initialValues: FormValues = { confirmPassword: '', newPassword: '' };

const Password: React.FunctionComponent<Props> = ({ onChangePassword }) => {
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const onSubmit = () => onChangePassword(values.newPassword);
  const { values, touched, handleSubmit, handleBlur, handleChange, errors } =
    useFormik<FormValues>({
      initialValues,
      onSubmit,
      validate: (values) => {
        const errors: Partial<FormValues> = {};
        if (!validatePassword(values.newPassword)) {
          errors.newPassword =
            'Lösenordet måste vara minst sex tecken och innehålla minst en siffra';
        }
        if (
          values.confirmPassword !== values.newPassword ||
          values.confirmPassword === ''
        ) {
          errors.confirmPassword =
            'Lösenordet måste stämma överrens med det ovan';
        }
        return errors;
      },
    });
  useEffect(() => {
    setSubmitIsDisabled(
      values.newPassword === '' || Object.keys(errors).length > 0
    );
  });
  return (
    <View style={styles.container}>
      <BoldText style={styles.title}>Lösenord</BoldText>
      <View style={styles.infoContainer}>
        <MediumText style={styles.subtitle}>Nytt lösenord</MediumText>
        <RegularText style={styles.infotext}>
          Ditt nya lösenord måste bestå av minst sex tecken varav en siffra.
        </RegularText>
      </View>
      <NewEditField
        label="Nytt lösenord"
        value={values.newPassword}
        onChangeText={handleChange('newPassword')}
        onBlur={handleBlur('newPassword')}
        error={touched.newPassword ? errors.newPassword : undefined}
        textInputProps={{ secureTextEntry: true, autoCapitalize: 'none' }}
      />
      <NewEditField
        label="Repetera nytt lösenord"
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        error={touched.confirmPassword ? errors.confirmPassword : undefined}
        textInputProps={{ secureTextEntry: true, autoCapitalize: 'none' }}
      />
      <View style={styles.buttonContainer}>
        <SignedInButton
          onPress={() => handleSubmit()}
          disabled={submitIsDisabled}
        >
          Spara nytt lösenord
        </SignedInButton>
      </View>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    color: Color.text,
    marginBottom: 40,
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingVertical: 40,
  },
  subtitle: {
    color: Color.text,
    fontSize: 16,
    fontWeight: '500',
  },
  infotext: {
    color: 'rgba(57, 81, 101, 0.5)',
    fontSize: 14,
    lineHeight: 19,
    paddingTop: 12,
  },
  infoContainer: {
    paddingTop: 15,
    paddingBottom: 30,
  },
});
