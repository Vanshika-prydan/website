import { storiesOf } from '@storybook/react-native';
import React from 'react';
import SignedInBookingButton from '.';

storiesOf('SignedInBookingButton', module).add('Default', () => (
  <SignedInBookingButton title="Test" onPress={() => {}} />
));
