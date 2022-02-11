import React from 'react';
import { Story, Meta } from '@storybook/react';

import Employees, { EmployeesProps } from './index';

export default {
  title: 'Employees/All employees',
  component: Employees,
} as Meta;

// @ts-ignore
const Template: Story<EmployeesProps> = (args) => <Employees {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // fetchAllRoles: () => {},
  // roles: []
};
