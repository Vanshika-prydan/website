import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Color } from '../../styles';
import PrimaryButton from '../../components/PrimaryButton';
import { MediumText } from '../../components/Text';

interface Props {
  onNext(): void;
}

const Sent: React.FunctionComponent<Props> = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require('../../../assets/letter.png')}
          resizeMode="contain"
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <MediumText style={styles.text}>
          Sådär! Vi har skickat ett email med ett nytt lösenord till dig.
        </MediumText>
      </View>
      <View style={{ alignItems: 'center' }}>
        <MediumText style={styles.text}>
          Fortsätt till nästa steg för att återställa ditt lösenordet.
        </MediumText>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onNext}>Fortsätt</PrimaryButton>
      </View>
    </View>
  );
};

export default Sent;

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: {
    fontSize: 20,
    color: Color.text,
    fontWeight: '500',
    marginVertical: 15,
    textAlign: 'center',
    maxWidth: 280,
  },

  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingBottom: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
});
