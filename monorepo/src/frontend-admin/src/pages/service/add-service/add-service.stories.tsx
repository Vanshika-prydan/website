import React from 'react';
import { Story, Meta } from '@storybook/react';
import TestProvider from '../../../utils/test-provider';
import AddService, { AddServiceProps } from './index';

export default {
  title: 'Services/Add service',
  component: AddService,
} as Meta;

// @ts-ignore
const Template: Story<AddServiceProps> = (args) => <TestProvider><AddService {...args} /></TestProvider>;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  onClose: () => {}
};
