import NewEditField from '../../components/NewField/new-input-field';
import { useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View, Alert, Image } from 'react-native';
import { generateErrorMessage } from '../../utils/generate-error-message';
import * as Yup from 'yup';
import { Color } from '../../styles';
import PrimaryButton from '../../components/PrimaryButton';
import { MediumText } from '../../components/Text';

interface Props {
  onNext(code: string): void;
}

interface FormValues {
  code: string;
}
const initialValues: FormValues = { code: '' };
const validationSchema = Yup.object({
  code: Yup.string()
    .matches(/^[0-9]+$/, 'Endast siffror är tillåtna')
    .min(8, 'Koden måste vara 8 tecken lång')
    .max(8, 'Koden måste vara 8 tecken lång')
    .required('Koden måste vara numerisk.'),
});

const Code: React.FunctionComponent<Props> = ({ onNext }) => {
  const onSubmit = async () => {
    try {
      onNext(values.code);
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

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../assets/icon-check-06.png')}
          style={styles.image}
        />
      </View>
      <View style={{ maxWidth: 320, alignSelf: 'center' }}>
        <MediumText style={styles.text}>
          Skriv in den 8-siffriga koden som vi har skickat till din email.
        </MediumText>
      </View>
      <View>
        <NewEditField
          label="8-siffrig kod"
          onChangeText={handleChange('code')}
          value={values.code}
          textInputProps={{
            keyboardType: 'numeric',
            autoCapitalize: 'none',
            style: { letterSpacing: 15 },
          }}
          onBlur={handleBlur('code')}
          error={touched.code ? errors.code : undefined}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={() => handleSubmit()}
          disabled={!!errors.code || values.code === ''}
        >
          Fortsätt
        </PrimaryButton>
      </View>
    </View>
  );
};

export default Code;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
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
    fontSize: 29,
    lineHeight: 28,
    color: Color.text,
    fontWeight: 'bold',
    marginVertical: 40,
  },
  text: {
    fontSize: 23,
    lineHeight: 28,
    color: Color.text,
    fontWeight: '500',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingBottom: 40,
  },
});
