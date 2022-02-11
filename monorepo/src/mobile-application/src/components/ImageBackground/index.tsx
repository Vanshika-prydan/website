import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground as RNImageBackground,
} from 'react-native';

const ImageBackground: React.FunctionComponent = ({ children }) => {
  return (
    <View style={styles.container}>
      <RNImageBackground
        imageStyle={styles.imgStyle}
        source={require('../../../assets/bakgrund.jpg')}
        style={styles.image}
      >
        <View style={styles.backgroundOverlay}>{children}</View>
      </RNImageBackground>
    </View>
  );
};

export default ImageBackground;

const styles = StyleSheet.create({
  container: {
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
  backgroundOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
});
