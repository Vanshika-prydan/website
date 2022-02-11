import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ScreenContainerWithoutPadding from '.';
import BookingTitle from '../BookingTitle';

storiesOf('ScreenContainerWithoutPadding', module)
  .add('Without title', () => (
    <ScreenContainerWithoutPadding>
      <BookingTitle title="Kontaktuppgifter" />
    </ScreenContainerWithoutPadding>
  ))
  .add('with title', () => (
    <ScreenContainerWithoutPadding title="Hemstäd">
      <BookingTitle title="Kontaktuppgifter" />
    </ScreenContainerWithoutPadding>
  ));
