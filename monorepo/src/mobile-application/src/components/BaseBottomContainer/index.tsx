import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../../styles';

const BaseBottomContainer: React.FunctionComponent = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default BaseBottomContainer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
