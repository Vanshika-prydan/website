import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../styles';
import SignedInBaseScreenContainer from '../../components/SignedInBaseScreenContainer';
import { BoldText } from '../Text';

interface Props {
  title: string;
}
const SignedInContentBox: React.FunctionComponent<Props> = ({
  title,
  children,
}) => {
  return (
    <SignedInBaseScreenContainer>
      <View style={styles.contentPadding}>
        <BoldText style={styles.titleText}>{title}</BoldText>
      </View>
      <View style={styles.contentPadding}>
        <View>{children}</View>
      </View>
    </SignedInBaseScreenContainer>
  );
};

export default SignedInContentBox;
const styles = StyleSheet.create({
  contentPadding: {
    paddingHorizontal: 40,
  },

  titleText: {
    color: Color.text,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
});
