import { storiesOf } from '@storybook/react-native';
import React from 'react';
import BaseBottomContainer from '.';
import ContentPadding from '../ContentPadding';
storiesOf('BaseBottomContainer', module).add('Default', () => (
  <BaseBottomContainer>
    <ContentPadding></ContentPadding>
  </BaseBottomContainer>
));
