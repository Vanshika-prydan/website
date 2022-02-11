import { storiesOf } from '@storybook/react-native';
import React from 'react';
import BottomContainer from '.';
import ContentPadding from '../ContentPadding';
storiesOf('BottomContainer', module).add('Default', () => (
  <BottomContainer>
    <ContentPadding></ContentPadding>
  </BottomContainer>
));
