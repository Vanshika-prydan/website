import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SecondaryButton from '.';

storiesOf('Input/SecondryButton', module).add('Default', () => (
  <SecondaryButton onPress={() => {}}>
    Logga in för att se din bokning
  </SecondaryButton>
));
