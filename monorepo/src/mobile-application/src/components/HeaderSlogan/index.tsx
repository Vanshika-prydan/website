import { BoldText } from '../Text';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const HeaderSlogan: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../assets/WCG-logo_white.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <BoldText style={styles.text}>
          Ett ekologiskt städbolag för ett rent hem – fritt från skadliga
          kemikalier.
        </BoldText>
      </View>
    </View>
  );
};

export default HeaderSlogan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  image: {
    width: '45%',
    resizeMode: 'contain',
    height: 80,
  },
  textContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 40,
  },

  text: {
    color: '#FFF',
    fontSize: 26,
    flexWrap: 'wrap',
  },
});
