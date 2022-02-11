import React from 'react';
import { Story, Meta } from '@storybook/react';

import CustomerList, { CustomerListProps } from './index';
import TestProvider from '../../../utils/test-provider';

export default {
  title: 'Page/customers',
  component: CustomerList,
} as Meta;

// @ts-ignore
const Template: Story<CustomerListProps> = (args) => <TestProvider><CustomerList {...args} /></TestProvider>;

export const Primary = Template.bind({});
Primary.args = {

};
