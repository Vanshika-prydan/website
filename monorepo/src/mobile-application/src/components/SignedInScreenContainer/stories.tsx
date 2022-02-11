import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SignedInScreenContainer from '.';
import BookingTitle from '../BookingTitle';

storiesOf('SignesInScreenContainer', module)
  .add('Without title', () => (
    <SignedInScreenContainer>
      <BookingTitle title="Mina bokninar" />
    </SignedInScreenContainer>
  ))
  .add('with title', () => (
    <SignedInScreenContainer title="Hemstäd">
      <BookingTitle title="Kontaktuppgifter" />
    </SignedInScreenContainer>
  ));
