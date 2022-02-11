import React from 'react';
import { Story, Meta } from '@storybook/react';

import CreateCustomerForm, { CreateCustomerFormProps } from './create-customer-form';

export default {
  title: 'Customer/create cystomer form',
  component: CreateCustomerForm,
} as Meta;

const Template: Story<CreateCustomerFormProps> = (args) => <CreateCustomerForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onCreated: () => {},
  onCancel: () => {}
};
