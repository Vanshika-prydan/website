import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Color } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BoldText, RegularText } from '../../components/Text';

interface BookingBoxProps {
  isfocused?: boolean;
  titleText: string;
  dateText: string;
  onExpand(): void;
}
const BookingBox: React.FunctionComponent<BookingBoxProps> = ({
  isfocused,
  titleText,
  dateText,
  children,
  onExpand,
}) => {
  return (
    <View style={styles.container}>
      {isfocused
        ? null
        : (
        <View style={styles.expandButtonContainer}>
          <TouchableOpacity onPress={onExpand} style={styles.expandButton}>
            <Image
              source={require('../../../assets/3-dots.png')}
              style={{ height: 6, width: 24 }}
            />
          </TouchableOpacity>
        </View>
          )}
      <RegularText style={styles.dateText}>{dateText}</RegularText>
      <BoldText style={styles.titleText}>{titleText}</BoldText>

      {isfocused
        ? (
        <View>
          <View style={styles.hrContainer}></View>
          {children}
        </View>
          )
        : null}
    </View>
  );
};

export default BookingBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECF2EA',
    padding: 25,
    marginBottom: 30,
    borderRadius: 4,
    flex: 1,
  },
  dateText: {
    color: 'rgba(58, 82, 103, 0.6)',
    fontSize: 13,
    zIndex: 0,
    elevation: 0,
  },
  titleText: {
    color: Color.text,
    fontSize: 17,
    paddingVertical: 5,
  },
  hrContainer: {
    marginVertical: 10,
    borderBottomColor: 'rgba(58, 82, 103, 0.2)',
    borderBottomWidth: 1,
  },

  expandButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    elevation: 1,
    flex: 1,
  },
  expandButton: {
    flex: 1,
    padding: 10,
  },
});
