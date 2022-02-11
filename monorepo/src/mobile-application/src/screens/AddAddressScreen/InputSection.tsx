import { RegularText } from '../../components/Text';
import TextInput from '../../components/TextInput';
import React from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';
import InputLabel from '../../components/InputLabel';

interface Props extends TextInputProps {
  errorMessage?: string;
  title: string;
}

const InputSection: React.FunctionComponent<Props> = (props) => {
  const { errorMessage, title, ...rest } = props;
  return (
    <View>
      <InputLabel>{title}</InputLabel>
      <TextInput {...rest} />
      {errorMessage
        ? (
        <RegularText style={styles.errorText}>{errorMessage}</RegularText>
          )
        : null}
    </View>
  );
};

export default InputSection;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
});
