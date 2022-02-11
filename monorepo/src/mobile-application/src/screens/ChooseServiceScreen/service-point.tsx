import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Color } from '../../styles';
import { MediumText } from '../../components/Text';

interface Props {
  title: string;
}
const ServicePoint: React.FunctionComponent<Props> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <FontAwesome name="circle" size={14} color={Color.text} />
      </View>
      <View style={styles.content}>
        <MediumText style={styles.titleText}>{title}</MediumText>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </View>
  );
};

export default ServicePoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 15,
  },
  icon: {
    flex: 1,
    paddingTop: 6,
  },
  content: {
    flex: 8,
  },
  titleText: {
    paddingTop: 2,
    color: Color.text,
    fontSize: 16,
    paddingBottom: 6,
  },
});
