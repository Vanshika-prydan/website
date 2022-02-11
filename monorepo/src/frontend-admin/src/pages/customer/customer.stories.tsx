import React from 'react';
import { Story, Meta } from '@storybook/react';

import Customer, { CustomerProps } from './index';
import TestProvider from '../../utils/test-provider';

export default {
  title: 'Page/customers',
  component: Customer,
} as Meta;

// @ts-ignore
const Template: Story<CustomerProps> = (args) => <TestProvider><Customer {...args} /></TestProvider>;

export const Primary = Template.bind({});
Primary.args = {

};
