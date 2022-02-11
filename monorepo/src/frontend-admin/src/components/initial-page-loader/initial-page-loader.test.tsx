import { render } from '@testing-library/react';
import React from 'react';
import InitialPageLoader from '.';
describe('Initial page loader component', () => {
  it('Should render', () => {
    render(<InitialPageLoader />);
  });
});
