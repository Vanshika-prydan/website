import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../styles';

import { BoldText } from '../Text';

export interface BookingTitleProps {
  title: string;
  icon?: any;
}
const BookingTitle: React.FunctionComponent<BookingTitleProps> = ({
  title,
  icon,
}) => {
  return (
    <View style={styles.container}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <BoldText style={styles.title}>{title}</BoldText>
    </View>
  );
};

export default BookingTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    color: Color.text,
    marginBottom: 10,
  },
});
