import { RegularText } from '../Text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../styles';

const SubTitle: React.FunctionComponent = ({ children }) => {
  return (
    <View style={styles.container}>
      <RegularText style={styles.text}>{children}</RegularText>
    </View>
  );
};

export default SubTitle;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },

  text: {
    color: Color.text,
    fontSize: 16,
  },
});
