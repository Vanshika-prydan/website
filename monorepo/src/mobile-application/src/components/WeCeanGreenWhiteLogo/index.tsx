import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const WeCeanGreenWhiteLogo: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/WCG-logo_white.png')}
        style={styles.image}
      />
    </View>
  );
};

export default WeCeanGreenWhiteLogo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    resizeMode: 'contain',
  },
});
