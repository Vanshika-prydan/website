import { BoldText, RegularText } from '../../components/Text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AddonModel } from '../../models/addon.model';
interface Props {
  addon: AddonModel;
  onPress(bookingId: string): void;
  isActive?: boolean;
}
const AddonBox: React.FunctionComponent<Props> = ({
  addon,
  onPress,
  isActive,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(addon.addonId)}>
      <View
        style={{
          ...styles.container,
          backgroundColor: isActive ? '#456179' : 'rgba(69, 97, 121, 0.5)',
        }}
      >
        <BoldText style={styles.name}>{addon.name} </BoldText>
        <RegularText style={styles.time}>
          +{addon.defaultTimeInMinutes}min
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

export default AddonBox;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#456179',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF',
  },
  time: {
    fontSize: 10,
    color: '#FFF',
  },
});
