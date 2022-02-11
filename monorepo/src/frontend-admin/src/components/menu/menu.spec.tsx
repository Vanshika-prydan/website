import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from '.';
import TestProvider from '../../utils/test-provider';

describe('Menu component', () => {
  it('Should render', () => {
    render(
      <BrowserRouter>
        <TestProvider>
          <Menu />
        </TestProvider>
      </BrowserRouter>
    );
  });
});
