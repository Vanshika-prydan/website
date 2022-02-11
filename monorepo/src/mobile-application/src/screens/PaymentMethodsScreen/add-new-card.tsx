import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../styles';
import AddCard from '../../components/AddCard';
import SignedInBaseScreenContainer from '../../components/SignedInBaseScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { BoldText, RegularText } from '../../components/Text';

const AddNewCard: React.FunctionComponent = () => {
  const nav = useNavigation();
  return (
    <SignedInBaseScreenContainer>
      <View style={styles.contentPadding}>
        <BoldText style={styles.headerText}>Lägg till kort</BoldText>
        <AddCard onAddedCard={() => nav.goBack()} />
        <TouchableOpacity onPress={() => nav.goBack()}>
          <RegularText style={styles.cancelText}>Avbryt</RegularText>
        </TouchableOpacity>
      </View>
    </SignedInBaseScreenContainer>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({
  contentPadding: {
    paddingHorizontal: 40,
  },
  cancelText: {
    textAlign: 'center',
    color: 'rgba(57, 81, 101, 0.6)',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: Color.text,
  },
});
