import React from 'react';
import { Story } from '@storybook/react';

import InitialPageLoader from '.';

export default {
  title: 'Initial page loader',
  component: InitialPageLoader,
};

const Template: Story = (args) => <InitialPageLoader {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {};
