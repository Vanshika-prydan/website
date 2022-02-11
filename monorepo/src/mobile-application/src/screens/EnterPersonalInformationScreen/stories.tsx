import React from 'react';
import { storiesOf } from '@storybook/react-native';
import EnterPersonalInformationPresenter from './presenter';
import useCreateCustomer from './useCreateCustomer';

const Story = () => {
  const hook = useCreateCustomer();
  return <EnterPersonalInformationPresenter {...hook} onSubmit={() => {}} />;
};

storiesOf('Screens/EnterPersonalInformation', module).add('Default', () => (
  <Story />
));
