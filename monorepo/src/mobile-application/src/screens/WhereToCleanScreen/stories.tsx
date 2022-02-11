import React from 'react';
import { storiesOf } from '@storybook/react-native';
import WhereToCleanScreen from './presenter';

storiesOf('Screens/WhereToCleanScreen', module).add('Default', () => (
  <WhereToCleanScreen
    onPressNext={() => {}}
    setPostalCode={() => {}}
    postalCode="11143"
  />
));
