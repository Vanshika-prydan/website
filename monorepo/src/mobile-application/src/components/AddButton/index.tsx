import { RegularText } from '../../components/Text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Color } from '../../styles';

interface Props {
  title: string;
  onPress(): void;
  withPadding?: boolean;
}

const AddButton: React.FunctionComponent<Props> = ({
  title,
  onPress,
  withPadding,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { paddingHorizontal: withPadding ? 40 : 0 }]}
      onPress={onPress}
    >
      <RegularText style={styles.text}>+ {title}</RegularText>
      <View style={styles.icon}>
        <AntDesign
          name="arrowright"
          size={24}
          color={'rgba(57, 81, 101, 0.6)'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    borderColor: 'rgba(68, 124, 56, 0.1)',
    paddingVertical: 20,
    marginVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'rgba(57, 81, 101, 0.6)',
  },
  icon: {},
  titleText: {
    color: Color.text,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
});
