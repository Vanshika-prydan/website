import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ScreenContainer from '.';
import BookingTitle from '../BookingTitle';

storiesOf('ScreenContainer', module)
  .add('Without title', () => (
    <ScreenContainer>
      <BookingTitle title="Kontaktuppgifter" />
    </ScreenContainer>
  ))
  .add('with title', () => (
    <ScreenContainer title="Hemstäd">
      <BookingTitle title="Kontaktuppgifter" />
    </ScreenContainer>
  ));
