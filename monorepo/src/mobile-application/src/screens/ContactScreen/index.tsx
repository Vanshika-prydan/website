import SignedInContentBox from '@components/SignedInContentBox';
import React from 'react';
import { StyleSheet, View, Linking, TouchableOpacity } from 'react-native';
import { MediumText, RegularText } from '@components/Text';
import config from '@src/config';

const ContactScreen: React.FunctionComponent = () => {
  return (
    <SignedInContentBox title="Kontakt">
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <MediumText style={styles.largeText}>
            We Clean Green Sweden AB
          </MediumText>
          <RegularText style={styles.normalText}>Tomtebogatan 5 </RegularText>
          <RegularText style={styles.normalText}>113 39, Stockholm</RegularText>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${config.EMAIL}`)}
          >
            <RegularText
              style={[styles.largeText, { textDecorationLine: 'underline' }]}
            >
              {config.EMAIL}
            </RegularText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${config.PHONE_NUMBER}`)}
          >
            <RegularText
              style={[styles.largeText, { textDecorationLine: 'underline' }]}
            >
              {config.PHONE_NUMBER}
            </RegularText>
          </TouchableOpacity>
        </View>
      </View>
    </SignedInContentBox>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  largeText: {
    color: '#3A5267',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: 10,
  },
  normalText: {
    color: '#3A5267',
    fontSize: 20,
    lineHeight: 28,
  },
  topContainer: {
    marginTop: 0,
  },
  bottomContainer: {
    marginTop: 40,
  },
  container: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: 'rgba(58, 82, 103, 0.1)',
    borderBottomWidth: 1,
    paddingVertical: 40,
  },
});
