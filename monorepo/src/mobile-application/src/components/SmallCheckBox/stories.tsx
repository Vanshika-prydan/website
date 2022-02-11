import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SmallCheckBox from '.';

storiesOf('Input/SmallCheckBox', module)
  .add('Checked', () => <SmallCheckBox checked={true} onPress={() => {}} />)
  .add('Unchecked', () => <SmallCheckBox checked={false} onPress={() => {}} />);
