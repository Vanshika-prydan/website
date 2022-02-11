import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import TextInput from '.';

storiesOf('Input/TextInput', module)
  .add('Placeholder', () => <TextInput value="" placeholder="First name" />)
  .add('With tect', () => <TextInput value="Anna" />);
