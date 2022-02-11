import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground as RNImageBackground,
} from 'react-native';

const SignedInImageBackground: React.FunctionComponent = ({ children }) => {
  return (
    <View style={styles.container}>
      <RNImageBackground
        imageStyle={styles.imgStyle}
        source={require('../../../assets/bakgrund.jpg')}
        style={styles.image}
      >
        <View style={styles.overlay}>{children}</View>
      </RNImageBackground>
    </View>
  );
};

export default SignedInImageBackground;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imgStyle: {
    resizeMode: 'cover',
    flex: 1,
  },
  overlay: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(57, 81, 101, 0.8)',
  },
});
