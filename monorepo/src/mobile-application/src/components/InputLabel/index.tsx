import { RegularText } from '../Text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../styles';

const InputLabel: React.FunctionComponent = ({ children }) => {
  return (
    <View>
      <RegularText style={styles.text}>{children}</RegularText>
    </View>
  );
};

export default InputLabel;

const styles = StyleSheet.create({
  text: {
    color: Color.text,
    opacity: 0.3,
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 5,
  },
});
