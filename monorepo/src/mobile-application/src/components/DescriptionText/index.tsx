import { RegularText } from '../Text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../styles';

const DescriptionText: React.FunctionComponent = ({ children }) => {
  return (
    <View>
      <RegularText style={styles.text}>{children}</RegularText>
    </View>
  );
};

export default DescriptionText;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: Color.text,
    opacity: 0.5,
  },
});
