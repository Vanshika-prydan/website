import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChooseServicePresenter from './presenter';

storiesOf('Screens/ChooseService', module).add('Default', () => (
  <ChooseServicePresenter onPressNext={() => {}} />
));
