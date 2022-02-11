import { render } from '@testing-library/react';
import AddonServiceList from './index';
import React from 'react';

describe('AddonServiceList', () => {
  it('Should render', () => {
    render(<AddonServiceList addons={[]} />);
  });
});
