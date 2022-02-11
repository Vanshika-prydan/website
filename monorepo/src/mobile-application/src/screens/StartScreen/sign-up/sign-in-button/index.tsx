import { RegularText } from '../../../../components/Text';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../../../styles';
interface Props {
  onPress(): void;
}

const SignInButton: React.FunctionComponent<Props> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <RegularText style={styles.text}>{children}</RegularText>
    </TouchableOpacity>
  );
};

export default SignInButton;

const styles = StyleSheet.create({
  container: {
    borderColor: 'rgba(68, 124, 56, 1)',
    borderRadius: 9,
    borderWidth: 1,
    backgroundColor: Color.background,
    padding: 10,
    marginVertical: 10,
  },
  text: {
    color: 'rgba(68, 124, 56, 1)',
    fontSize: 15,
    textAlign: 'center',
  },
});
