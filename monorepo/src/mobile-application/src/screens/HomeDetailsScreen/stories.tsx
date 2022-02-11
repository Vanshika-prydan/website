import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { AddonModel } from '../../models/addon.model';
import HomeDetailsScreenPresenter from './presenter';

const addon: AddonModel = {
  addonId: '111g',
  description: '',
  name: 'Frysstädning',
  defaultTimeInMinutes: 30,
  unit: 'st',
};

storiesOf('Screens/HomeDetails', module).add('Default', () => (
  <HomeDetailsScreenPresenter
    setM2={() => {}}
    m2="124"
    setNumberOfBathrooms={() => {}}
    numberOfBathRooms="2"
    estimatedTimeInMinutes={150}
    addons={[addon]}
    selectedAddons={[]}
    onSelectAddon={() => {}}
    onPressNext={() => {}}
  />
));
