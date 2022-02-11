import React from 'react';
import { storiesOf } from '@storybook/react-native';
import BookingTitle from '.';

storiesOf('BookingTitle', module).add('default', () => (
  <BookingTitle title="Berätta om din bostad" />
));
