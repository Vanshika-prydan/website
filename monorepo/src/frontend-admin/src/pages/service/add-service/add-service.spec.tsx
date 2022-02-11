import React from 'react';
import { render } from '@testing-library/react';
import AddService from './index';
import TestProvider from '../../../utils/test-provider';

describe('Service page', () => {
  it('Should render', () => {
    render(<TestProvider><AddService onClose={() => {}} isOpen={true} /></TestProvider>);
  });
});
