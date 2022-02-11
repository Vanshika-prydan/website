import React from 'react';
import { render } from '@testing-library/react';
import SelectRolesComponent, { SelectRolesComponentProps } from './index';

it('Should be able to render', () => {
  const props: SelectRolesComponentProps = {
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
    ],
    onSelectedRoles: () => {},
  };
  render(<SelectRolesComponent {...props} />);
});
