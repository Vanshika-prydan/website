import NewEditField from '../../components/NewField/new-input-field';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import apiService from '../../services/api-service';
import { generateErrorMessage } from '../../utils/generate-error-message';
import * as Yup from 'yup';
import { Color } from '../../styles';
import PrimaryButton from '../../components/PrimaryButton';
import { MediumText, RegularText } from '../../components/Text';

interface Props {
  onNext(email: string): void;
  onCancel(): void;
}

interface FormValues {
  email: string;
}
const initialValues: FormValues = { email: '' };
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Måste innehålla en emailadress')
    .required('Fältet är obligatoriskt'),
});

const Email: React.FunctionComponent<Props> = ({ onNext, onCancel }) => {
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const onSubmit = async () => {
    try {
      await apiService.forgottenPassword(values.email);
      onNext(values.email);
    } catch (e) {
      Alert.alert('Ett fel uppstod', generateErrorMessage(e));
    }
  };
  const { errors, values, handleChange, handleSubmit, handleBlur, touched } =
    useFormik<FormValues>({
      initialValues,
      onSubmit,
      validationSchema,
    });

  useEffect(() => {
    setSubmitIsDisabled(values.email === '' || !!errors.email);
  });

  return (
    <View style={styles.container}>
      <View>
        <RegularText style={styles.title}>
          Ibland glömmer vi bort saker och ting. Men det går att lösa!
        </RegularText>
      </View>
      <View>
        <MediumText style={styles.subtitle}>
          Ange din e-postadress och använd det nya lösenordet vi skickar till
          din inkorg för att logga in.
        </MediumText>
      </View>
      <View>
        <NewEditField
          label="E-postadress"
          onChangeText={handleChange('email')}
          value={values.email}
          textInputProps={{
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
          onBlur={handleBlur('email')}
          error={touched.email ? errors.email : undefined}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={() => handleSubmit()}
          disabled={submitIsDisabled}
        >
          Återställ lösenord
        </PrimaryButton>
        <TouchableOpacity onPress={onCancel}>
          <RegularText style={styles.cancelText}>Avbryt</RegularText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height * 0.7,
  },

  backgroundImage: {
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },

  contentContainer: {
    backgroundColor: Color.background,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    marginTop: 200,
    flex: 1,
  },

  title: {
    fontSize: 22,
    lineHeight: 28,
    color: Color.text,
    fontWeight: 'bold',
    marginVertical: 50,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: Color.text,
    fontWeight: '500',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  cancelText: {
    color: Color.text,
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
});
