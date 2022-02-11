import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import Select from '.';

const items = [
  { label: '2', value: 2 },
  { label: '3', value: 2 },
  { label: '4', value: 2 },
  { label: '5', value: 2 },
];

storiesOf('Input/Select', module).add('Default', () => (
  <Select items={items} onSelect={() => {}} value={items[0]} />
));
