import TestProvider from '../../utils/test-provider';
import React from 'react';
import PermissionRequired from './index';
import { render } from '@testing-library/react';
import Permission from '../../../../api-core/src/domain/definitions/Permission';
describe('Permission required', () => {
  it('Should render', () => {
    render(<TestProvider><PermissionRequired permission={Permission.ACCESS_TO_BACK_OFFICE} /></TestProvider>);
  });
});
