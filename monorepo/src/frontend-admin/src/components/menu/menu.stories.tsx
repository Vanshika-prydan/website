import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from './index';

export default {
  title: 'Components/Menu',
  component: Menu,
} as Meta;

// @ts-ignore
const Template: Story = (args) => (
  <Router>
    <Menu {...args} />
  </Router>
);

export const Primary = Template.bind({});
Primary.args = {};
