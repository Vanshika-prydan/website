import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Color } from '../../styles';
import { RegularText } from '../../components/Text';

const ListElement: React.FunctionComponent = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <FontAwesome name="circle" size={4} color={Color.text} />
      </View>
      <RegularText style={styles.text}>{children}</RegularText>
    </View>
  );
};

export default ListElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 7,
  },
  icon: {
    paddingTop: 7,
    paddingRight: 5,
  },
  text: {
    fontSize: 14,
    color: 'rgba(57, 81, 101, 0.8)',
  },
});
