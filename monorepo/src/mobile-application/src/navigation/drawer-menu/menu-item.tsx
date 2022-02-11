import { MediumText } from '../../components/Text';
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../styles';

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  onPress(): void;
  isActive?: boolean;
}
const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  icon,
  label,
  onPress,
  isActive,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...menuStyles.container,
        ...(isActive ? menuStyles.isActive : null),
      }}
      onPress={onPress}
    >
      <View style={menuStyles.icon}>{icon}</View>
      <MediumText style={menuStyles.text}>{label}</MediumText>
    </TouchableOpacity>
  );
};

export default MenuItem;

const menuStyles = StyleSheet.create({
  container: {
    width: '85%',

    height: 40,
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
    color: Color.text,
    fontWeight: '500',
  },
  icon: {
    marginHorizontal: 16,
  },
  isActive: {
    backgroundColor: 'rgba(57, 81, 101, 0.1)',
  },
});
