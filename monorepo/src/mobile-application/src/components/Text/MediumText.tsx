import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

const MediumText: React.FunctionComponent<TextProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <RNText {...rest} style={[styles.text, rest.style]}>
      {children}
    </RNText>
  );
};

export default MediumText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'BalooChettan2Medium',
  },
});
