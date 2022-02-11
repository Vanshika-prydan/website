import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface SelectBoxProps {
  selected: boolean;
  onPress(): void;
}

const SelectBox: React.FunctionComponent<SelectBoxProps> = ({
  children,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          ...styles.checkbox,
          borderWidth: selected ? 3 : 1,
        }}
      >
        {selected
          ? (
          <Image
            source={require('../../../assets/lov.png')}
            style={styles.image}
            resizeMethod="scale"
          />
            )
          : null}
      </View>
      <View style={styles.textContainer}>{children}</View>
    </TouchableOpacity>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    paddingLeft: 20,
  },
  image: {
    height: 16,
    width: 18,
  },
  checkbox: {
    borderColor: '#447C384A',
    borderRadius: 4,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
