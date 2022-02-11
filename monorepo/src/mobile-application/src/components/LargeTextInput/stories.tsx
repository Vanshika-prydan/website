import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import LargeTextInput from '.';

storiesOf('Input/LargeTextInput', module)
  .add('default', () => <LargeTextInput value="test" />)
  .add('Placeholder', () => <LargeTextInput placeholder="Address" />);
