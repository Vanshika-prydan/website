import React from 'react';
import { StyleSheet, View } from 'react-native';

const InlineBox: React.FunctionComponent = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default InlineBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
});
