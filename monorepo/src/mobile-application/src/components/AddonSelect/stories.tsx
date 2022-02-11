import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import AddonSelect from '.';

storiesOf('AddonSelect', module)
  .add('Unselected', () => (
    <AddonSelect
      title="Kylskåp"
      defaultTimeInMinutes={30}
      onPress={() => {}}
      selected={false}
    />
  ))
  .add('Selected', () => (
    <AddonSelect
      title="Kylskåp"
      defaultTimeInMinutes={30}
      onPress={() => {}}
      selected={true}
    />
  ));
