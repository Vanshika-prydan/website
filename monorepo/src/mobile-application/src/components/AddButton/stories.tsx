import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import AddButton from '.';

storiesOf('AddButton', module).add('Default', () => (
  <AddButton title="Add button" onPress={() => {}} />
));
