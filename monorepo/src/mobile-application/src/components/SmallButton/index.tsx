import { RegularText } from '../Text';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../styles';

interface Props {
  onPress(): void;
  invertColor?: boolean;
  title: string;
}
const SmallButton: React.FunctionComponent<Props> = ({
  onPress,
  title,
  invertColor,
}) => {
  return (
    <TouchableOpacity
      containerStyle={{ flex: 1 }}
      onPress={onPress}
      style={invertColor ? invertStyles.container : normalStyles.container}
    >
      <RegularText style={invertColor ? invertStyles.text : normalStyles.text}>
        {title}
      </RegularText>
    </TouchableOpacity>
  );
};

export default SmallButton;

const baseStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    shadowColor: '#D6E0D3',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
});

const invertStyles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: Color.text,
  },
  text: {
    ...baseStyles.text,
    color: Color.background,
  },
});
const normalStyles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: Color.background,
  },
  text: {
    ...baseStyles.text,
    color: Color.text,
  },
});
