import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SignUpStartScreenPresenter from './presenter';

storiesOf('Screens/StartScreen', module).add('Default', () => (
  <SignUpStartScreenPresenter onPressStart={() => {}} />
));
