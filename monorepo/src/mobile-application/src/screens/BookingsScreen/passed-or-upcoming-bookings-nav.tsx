import { RegularText } from '../../components/Text';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../styles';

export type SelectVal = 'upcoming' | 'passed';

interface Props {
  onSelect(val: SelectVal): void;
  selected: SelectVal;
}

const PassedOrUpcomingBookingsNav: React.FunctionComponent<Props> = ({
  onSelect,
  selected,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onSelect('passed')}
        style={{
          ...styles.button,
          ...(selected === 'passed'
            ? { backgroundColor: Color.background }
            : undefined),
        }}
      >
        <RegularText style={styles.text}>Utförda</RegularText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect('upcoming')}
        style={{
          ...styles.button,
          ...(selected === 'upcoming'
            ? { backgroundColor: Color.background }
            : undefined),
        }}
      >
        <RegularText style={styles.text}>Kommande</RegularText>
      </TouchableOpacity>
    </View>
  );
};

export default PassedOrUpcomingBookingsNav;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -50,
    left: '5%',
    right: '5%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    paddingVertical: 10,
    width: Dimensions.get('screen').width * 0.45,
  },
  text: {
    fontSize: 15,
    color: Color.text,
    textAlign: 'center',
  },
});
