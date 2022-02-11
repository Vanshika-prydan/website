import React from 'react';
import { Story, Meta } from '@storybook/react';

import EmployeeTable, { EmployeeListProps } from './index';

export default {
  title: 'Employees/Employee list',
  component: EmployeeTable,
} as Meta;

const Template: Story<EmployeeListProps> = (args) => <EmployeeTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  employees: [
  ]
};
