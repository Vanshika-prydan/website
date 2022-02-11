import React from 'react';
import { Story, Meta } from '@storybook/react';

import CreateCustomer, { CreateCustomerProps } from './index';
import TestProvider from '../../../utils/test-provider';

export default {
  title: 'Customer/Create customer',
  component: CreateCustomer,
  args: {
    isOpen: true,
    onClose: () => {},
  },
} as Meta;

const Template: Story<CreateCustomerProps> = (args) => (
  <TestProvider>
    <CreateCustomer {...args} />
  </TestProvider>
);

export const CreateCustomerState = Template.bind({});
CreateCustomerState.args = {
  isOpen: true,
  initialState: {
    addAddressIsExpanded: false,
    createdCustomer: undefined,
  },
};

export const AddAddressState = Template.bind({});

AddAddressState.args = {
  isOpen: true,
  initialState: {
    addAddressIsExpanded: true,
    createdCustomer: {
      customerId: 'a61de91a-cfe5-4f82-8e9b-d838efa9b9bb',
      account: {
        accountId: 'db61dc15-3ba0-4762-928c-ce4936aafcd5',
        firstName: 'Niklas',
        lastName: 'Johansson',
        email: 'niklas@test.com',
        phoneNumber: '0704443320',
        dateCreated: '2021-03-24T15:10:32.613Z',
        dateUpdated: '2021-03-24T15:10:32.613Z',
        roles: [],
      },
      receiveMarketingCommunication: false,
    },
  },
};
