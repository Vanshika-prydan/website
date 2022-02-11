import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Color } from '../../styles';

import * as Linking from 'expo-linking';
import { RegularText } from '../../components/Text';

const ContactComponent: React.FunctionComponent = () => {
  const openContactPage = () => Linking.openURL('https://cleangreen.se');
  return (
    <View style={styles.contactBox}>
      <RegularText style={styles.contactText}>
        Hittar du ingen tid som passar dig? Kontakta oss så ska vi se till att
        ordna det åt dig.
      </RegularText>
      <TouchableOpacity style={styles.button} onPress={openContactPage}>
        <RegularText>Kontakta oss</RegularText>
      </TouchableOpacity>
    </View>
  );
};

export default ContactComponent;

const styles = StyleSheet.create({
  contactBox: {
    marginTop: 30,
    marginBottom: 60,
    backgroundColor: Color.border,
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 50,
    borderRadius: 4,
  },
  contactText: {
    color: Color.text,
    fontSize: 14,
  },
  button: {
    position: 'absolute',
    bottom: -23,
    padding: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.border,
    backgroundColor: Color.background,
    alignSelf: 'center',
  },
  buttonText: {
    color: Color.text,
    textAlign: 'center',
    fontSize: 16,
  },
});
