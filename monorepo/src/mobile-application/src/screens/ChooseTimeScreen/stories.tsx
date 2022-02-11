import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ChooseTimeScreenPresenter from './presenter';

storiesOf('Screens/ChooseTimeScreen', module).add('Default', () => (
  <ChooseTimeScreenPresenter onPressNext={() => {}} />
));
