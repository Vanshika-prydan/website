import React from 'react';
import { StyleSheet, View } from 'react-native';

const BottomContainer: React.FunctionComponent = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default BottomContainer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'rgba(255,255,255,1)',
  },
});
