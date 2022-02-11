import React from 'react';
import { Story, Meta } from '@storybook/react';

import CreateEmployee, { CreateEmployeeProps } from './index';

export default {
  title: 'Employees/Create employee',
  component: CreateEmployee,
} as Meta;

const Template: Story<CreateEmployeeProps> = (args) => <CreateEmployee {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true
};
