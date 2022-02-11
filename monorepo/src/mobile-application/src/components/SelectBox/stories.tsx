import { storiesOf } from '@storybook/react-native';
import SelectBox from '.';
import React from 'react';
import { Text } from 'react-native';

storiesOf('Input/SelectBox', module)
  .add('Selected', () => (
    <SelectBox selected={true} onPress={() => {}}>
      <Text> Text</Text>
    </SelectBox>
  ))
  .add('Unselected', () => (
    <SelectBox selected={false} onPress={() => {}}>
      <Text> Text</Text>
    </SelectBox>
  ));
