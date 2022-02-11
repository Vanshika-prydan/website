import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SignedInBaseScreenContainer from '.';
import BookingTitle from '../BookingTitle';

storiesOf('SignesInBaseSScreenContainer', module)
  .add('Without title', () => (
    <SignedInBaseScreenContainer>
      <BookingTitle title="Mina bokninar" />
    </SignedInBaseScreenContainer>
  ))
  .add('with title', () => (
    <SignedInBaseScreenContainer title="Hemstäd">
      <BookingTitle title="Kontaktuppgifter" />
    </SignedInBaseScreenContainer>
  ));
