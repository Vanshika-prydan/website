import { storiesOf } from '@storybook/react-native';
import DescriptionText from '.';
import React from 'react';

storiesOf('DescriptionText', module).add('Default', () => (
  <DescriptionText>
    Du får samma återkommande städerska varje gång med We Clean Green.
  </DescriptionText>
));
