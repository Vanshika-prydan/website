import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TimeSlot from '.';

storiesOf('TimeSlot', module)
  .add('unselected', () => <TimeSlot time={new Date()} />)
  .add('Selected', () => <TimeSlot selected={true} time={new Date()} />);
