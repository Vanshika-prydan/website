import { RegularText } from '../Text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../styles';

const InputTitle: React.FunctionComponent = ({ children }) => {
  return (
    <View style={styles.container}>
      <RegularText style={styles.text}>{children}</RegularText>
    </View>
  );
};

export default InputTitle;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 5,
  },

  text: {
    color: Color.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
