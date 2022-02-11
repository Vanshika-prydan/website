import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Color } from '../../styles';
import ContentPadding from '../../components/ContentPadding';
import PrimaryButton from '../../components/PrimaryButton';
import ServiceCard from './ServiceCard';
import { RegularText } from '../../components/Text';

interface ChooseServicePresenterProps {
  onPressNext(): void;
}

const ChooseServicePresenter: React.FunctionComponent<ChooseServicePresenterProps> =
  ({ onPressNext }) => {
    return (
      <SafeAreaView style={styles.screen}>
        <ScrollView
          horizontal={true}
          snapToInterval={220 + 15 * 2}
          decelerationRate="fast"
        >
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              <ServiceCard
                background={require('../../../assets/hemstad.jpg')}
                title="Hemstäd"
              />
              <RegularText style={styles.titleText}>Hemstäd</RegularText>
              <RegularText style={styles.text}>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis.magna aliqua. Ut enim ad
                minim veniam,. Sed do eiusmod.
              </RegularText>
              <RegularText style={styles.titleText}>
                Generellt gör vi följande i alla rum
              </RegularText>
              <RegularText style={styles.titleText}>
                Bad och toalett
              </RegularText>
              <RegularText style={styles.titleText}>Kök</RegularText>
            </View>
            {/* }
            <View style={styles.cardContainer}>
              <ServiceCard
                background={require('../../../assets/Kontor.jpg')}
                title="Kontorsstäd"
              />
            </View>
            <View style={styles.cardContainer}>
              <ServiceCard
                background={require('../../../assets/flyttstad.jpg')}
                title="Flyttstäd"
              />
            </View>
    */}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <ContentPadding>
            <PrimaryButton onPress={onPressNext}>Boka</PrimaryButton>
          </ContentPadding>
        </View>
      </SafeAreaView>
    );
  };

export default ChooseServicePresenter;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    paddingHorizontal: (Dimensions.get('window').width - 280) / 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  cardContainer: {},
  titleText: {
    color: Color.text,
    fontSize: 16,
  },
  text: {
    width: Dimensions.get('screen').width * 0.6,
    fontSize: 14,
    color: 'rgba(57, 81, 101, 0.8)',
  },
});
