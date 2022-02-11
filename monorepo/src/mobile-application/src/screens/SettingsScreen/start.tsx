import React from 'react';
import { StyleSheet } from 'react-native';
import SignedInContentBox from '../../components/SignedInContentBox';
import { useNavigation } from '@react-navigation/core';
import NewField from '../../components/NewField/new-field';

const SettingsStart: React.FunctionComponent = () => {
  const nav = useNavigation();
  return (
    <SignedInContentBox title="Inställningar">
      <NewField
        label="Lösenord"
        value="********"
        onEdit={() => nav.navigate('SETTINGS_PASSWORD')}
      />
    </SignedInContentBox>
  );
};

export default SettingsStart;

const styles = StyleSheet.create({});
