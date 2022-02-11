import React from 'react';
import { Story, Meta } from '@storybook/react';

import SelectRolesComponent, { SelectRolesComponentProps } from './index';

export default {
  title: 'Forms/Select roles',
  component: SelectRolesComponent,
} as Meta;

const Template: Story<SelectRolesComponentProps> = (args) => (
  <SelectRolesComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  onSelectedRoles: () => {},
  allRoles: [
    {
      name: 'DEVELOPER',
      permissions: [
        'EMPLOYEE_CREATE',
        'EMPLOYEE_UPDATE',
        'EMPLOYEE_LIST_ALL',
        'CUSTOMER_LIST_ALL',
        'CUSTOMER_ADD_AND_BIND_ADDRESS',
      ],
      description: '',
    },
    {
      name: 'ADMINISTRATOR',
      permissions: ['EMPLOYEE_CREATE'],
      description: '',
    },
  ],
};
