import React from 'react';
import { Story, Meta } from '@storybook/react';

import AddAddressForm, { AddAddressProps } from './add-address-form';

export default {
  title: 'Customer/add address form',
  component: AddAddressForm,
} as Meta;

const Template: Story<AddAddressProps> = (args) => <AddAddressForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  customerId: '2435y6',
  onAddedAddress: () => {},
  onClose: () => {},
};
