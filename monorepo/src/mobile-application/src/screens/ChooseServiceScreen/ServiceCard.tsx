import { RegularText } from '../../components/Text';
import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import { Color } from '../../styles';

interface ServiceCardProps {
  title: string;
  background: ImageSourcePropType;
}

const ServiceCard: React.FunctionComponent<ServiceCardProps> = ({
  title,
  background,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.titleBox}>
          <RegularText style={styles.title}>{title}</RegularText>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  titleBox: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 9,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 18,
    color: Color.text,
    textAlign: 'center',
  },
  container: {
    height: 280,
    width: 220,
    borderRadius: 9,
    marginVertical: 15,
  },
  image: {
    borderRadius: 9,
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
