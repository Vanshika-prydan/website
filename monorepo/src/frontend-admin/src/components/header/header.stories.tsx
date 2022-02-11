import React from 'react';
import { Story, Meta } from '@storybook/react';

import Header from './index';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
