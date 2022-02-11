import { storiesOf } from '@storybook/react-native';
import React from 'react';
import InlineBox from '.';
import DescriptionText from '../DescriptionText';

storiesOf('InlineBox', module).add('Default', () => (
  <InlineBox>
    <DescriptionText>Här är lite text inline</DescriptionText>
  </InlineBox>
));
