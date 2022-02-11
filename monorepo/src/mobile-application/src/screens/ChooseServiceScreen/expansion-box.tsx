import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Color } from '../../styles';
import { MediumText } from '../../components/Text';

export interface Props {
  title: string;
  initiallyOpen?: boolean;
}
const ExpansionBox: React.FunctionComponent<Props> = ({
  title,
  initiallyOpen,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen ?? false);
  return (
    <View
      style={{
        ...styles.container,
        borderColor: isOpen ? Color.text : 'rgba(57, 81, 101, 0.1)',
      }}
    >
      <View style={styles.icon}>
        <FontAwesome name="circle" size={14} color={Color.text} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <View style={styles.header}>
            <MediumText style={styles.titleText}>{title}</MediumText>

            <View style={styles.button}>
              {isOpen
                ? (
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={24}
                  color={Color.text}
                />
                  )
                : (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={Color.text}
                />
                  )}
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: isOpen ? 'flex' : 'none',
            flex: 1,
            paddingRight: 20,
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default ExpansionBox;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  icon: {
    flex: 1,
    paddingTop: 14,
  },
  content: {
    flex: 12,
  },
  titleText: {
    paddingTop: 2,
    color: Color.text,
    fontSize: 16,
    paddingBottom: 6,
  },
});
