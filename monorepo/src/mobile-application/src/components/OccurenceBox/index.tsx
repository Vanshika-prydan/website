import { BoldText, RegularText } from '../Text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Color } from '../../styles';

export interface OccurrenceBoxProps {
  selected?: boolean;
  onPress(): void;
  title: string;
  price: string;
  description: string;
  value: string;
  isMostPopular?: boolean;
  regularPrice?: string;
}
const OccurrenceBox: React.FunctionComponent<OccurrenceBoxProps> = ({
  selected,
  onPress,
  title,
  price,
  description,
  isMostPopular,
  regularPrice,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {isMostPopular
          ? (
          <View style={styles.mostPopularBox}>
            <BoldText style={styles.mostPopularText}>Populärast!</BoldText>
          </View>
            )
          : null}
        <View
          style={{
            ...styles.container,
            ...{ borderWidth: selected ? 4 : 1 },
            ...(selected
              ? {
                  padding: 17,
                }
              : {}),
          }}
        >
          <View style={styles.left}>
            <BoldText style={styles.title}>{title}</BoldText>
            <RegularText style={styles.description}>{description}</RegularText>
          </View>
          <View style={styles.right}>
            <BoldText style={styles.price}>
              {regularPrice
                ? (
                <>
                  <RegularText
                    style={{
                      color: Color.text,
                      textDecorationLine: 'line-through',
                    }}
                  >
                    {regularPrice} kr/h{' '}
                  </RegularText>
                </>
                  )
                : null}
              {price} kr/h
            </BoldText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OccurrenceBox;

const styles = StyleSheet.create({
  mostPopularBox: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: Color.background,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  mostPopularText: {
    color: Color.primary,
    fontSize: 12,
  },
  container: {
    borderRadius: 4,
    borderColor: '#447C384A',
    marginVertical: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {},
  right: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Color.text,
    fontSize: 16,
    paddingBottom: 6,
  },
  price: {
    color: 'rgba(255, 0, 0, 0.6)',
    fontSize: 18,
    textAlign: 'right',
  },
  description: {
    color: Color.text,
    fontSize: 14,
    opacity: 0.5,
  },
});
