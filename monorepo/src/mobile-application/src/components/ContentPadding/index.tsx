import React from 'react';
import { StyleSheet, View } from 'react-native';

const ContentPadding: React.FunctionComponent = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default ContentPadding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
});
